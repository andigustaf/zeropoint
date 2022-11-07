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
    <Camera
      isFullscreen = {true}
      imageType = {'jpg'}
      imageCompression = {0.9}
      idealResolution = {{width: 640, height: 480}}
      onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
    />
    );
  }
  
  export default selfie
  