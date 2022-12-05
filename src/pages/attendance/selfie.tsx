import {Flex} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {useAttendance} from '../../context/AttendanceContext';

const selfie = () => {
    const router = useRouter()
    const {attendance, setAttendance} = useAttendance()

    if (attendance.type == '') {
        router.push('/attendance')
    }

    const handleTakePhoto = async (dataUri) => {
        setAttendance({...attendance, base64Image: dataUri})
        router.back()
        router.replace('/attendance/selfie', '/attendance')
    }

    const [windowDimention, setWindowDimention] = useState({
        width: 0,
        height: 0
    })

    const [idealWidth, setIdealWidth] = useState(0)

    const getWindowDimention = () => {
        const {innerWidth: width, innerHeight: height} = window
        setWindowDimention({width, height})
        setIdealWidth(width > height ? height : width)
    }

    useEffect(() => {
        window.addEventListener("resize", getWindowDimention);
        return () => window.removeEventListener("resize", getWindowDimention);
    }, [])

    useEffect(() => {
        getWindowDimention()
    }, [])

    return (
        <Flex
            justify="center"
            alignItems={'center'}
            minH={"100vh"}
            pt={6}
            bg="gray.900"
            w="full"
        >
            <Camera
                isFullscreen={false}
                imageType={'jpg'}
                imageCompression={0.97}
                isMaxResolution={false}
                isImageMirror={true}
                sizeFactor={1}
                idealResolution={{
                    width: idealWidth,
                    height: idealWidth
                }}
                onTakePhoto={(dataUri) => {
                    handleTakePhoto(dataUri);
                }}
            />
        </Flex>
    );
}

export default selfie
  