import {Box, Flex, IconButton} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useCallback, useEffect, useRef, useState} from 'react';
import {FiCamera} from 'react-icons/fi';
import Webcam from 'react-webcam';
import {useAttendance} from '../../context/AttendanceContext';

const photo = () => {
    const router = useRouter()
    const {attendance, setAttendance} = useAttendance()
    const [windowDimention, setWindowDimention] = useState({
        width: 0,
        height: 0
    })

    if (attendance.type == '') {
        router.back()
    }

    const getWindowDimention = () => {
        const {innerWidth: width, innerHeight: height} = window
        setWindowDimention({width, height})
    }

    useEffect(() => {
        window.addEventListener("resize", getWindowDimention);
        return () => window.removeEventListener("resize", getWindowDimention);
    }, [])

    useEffect(() => {
        getWindowDimention()
    }, [])


    const videoConstraints = {
        width: windowDimention.width,
        height: windowDimention.width,
        facingMode: "user"
    };

    const webcamRef = useRef(null);
    const capture = useCallback(() => {
        const dataUri = webcamRef.current.getScreenshot()
        setAttendance({...attendance, base64Image: dataUri})
        router.back()
        router.replace('/attendance/photo', '/attendance')
    }, [webcamRef])

    return (
        <Flex
            justify="center"
            alignItems={'center'}
            minH={"100vh"}
            bg="black"
            w="full"
        >
            <Box textAlign={'center'}>
                <Webcam
                    audio={false}
                    height={windowDimention.width}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={windowDimention.width}
                    videoConstraints={videoConstraints}
                />
                <IconButton
                    mt={6}
                    width={'48px'}
                    variant={'solid'}
                    bg={'gray.100'}
                    color={'gray.700'}
                    rounded={'full'}
                    aria-label='take photo'
                    icon={<FiCamera width={8} height={8}/>}
                    onClick={capture}
                />
            </Box>
        </Flex>
    );
}

export default photo
  