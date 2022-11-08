import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { useAttendance } from '../../context/AttendanceContext';

const selfie = () => {
  const router = useRouter()
  const { attendance, setAttendance } = useAttendance()

  if (attendance.type == '') {
    router.push('/attendance')
  }

  const handleTakePhoto = async (dataUri) => {
    setAttendance({...attendance, base64Image:dataUri})
    router.push('/attendance/form')
  }
  
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
        isFullscreen = {true}
        imageType = {'jpg'}
        imageCompression={0.97}
        isMaxResolution={false}
        sizeFactor={1}
        idealResolution = {{width: 120, height: 480}}
        onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
      />
    </Flex>
    );
  }
  
  export default selfie
  