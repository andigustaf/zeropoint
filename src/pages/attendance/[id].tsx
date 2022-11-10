import { Box, Divider, Flex, Image, Stack, Text } from '@chakra-ui/react'
import {  getDoc, doc } from "firebase/firestore";
import { firestore } from '../../config/firebase';
import { useEffect, useState } from 'react';
import PigeonMap from '../../components/PigeonMap';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { Navbar } from '../../components/Navbar';

const AttendanceDetail = () => {
  const router = useRouter()
  const { id: attendanceId } = router.query 
  const [attendance, setAttendance] = useState(null)
  const docRef = doc(firestore, "checklogs/" + attendanceId)

  useEffect(() => {
    const getAttendace = async () => {
      const querySnapshot = await getDoc(docRef);
      if(querySnapshot.exists()) {
        setAttendance({id: querySnapshot.id, ...querySnapshot.data() })
      } else {
        console.log("Document does not exist")
      }
    }
    try {
      getAttendace()
    } catch (e) {
      console.log(e)
    }
  }, [])

  const formatAttendanceType = (str) => {
    str = str.replace(/_/g, " ")
    str = str.toLowerCase()
    return str
  }

  return (
    <>
      <Navbar/>
      <Flex
        justify="center"
        bg="white"
        w="full"
      >
        { attendance ? (
          <Box w="full">
          <Flex w="full" height={'225px'}>
            <Box w='full'>
              <PigeonMap center={[
                attendance.coordinate._lat,
                attendance.coordinate._long,
              ]} zoom={15} />
            </Box>
            <Box w='full' h="225px">
              <Image
                w="full"
                h="full"
                backgroundImage={attendance?.image_url}
                backgroundSize="cover"
                object-fit="cover"
              />
            </Box>
          </Flex>

          <Flex w="full" px={0} justifyContent={'center'}>
            <Box
              marginTop={{base:0, md:6}}
              rounded={"lg"}
              bg="white"
              paddingY={6}
              w="full"
              maxW="md"
            >
              <Stack spacing={4}>
                <Flex paddingX={4}>
                  <Stack w={'full'} spacing={0}>
                    <Text fontWeight={'semibold'}>Checked Time</Text>
                    <Text>{ format(new Date(attendance.timestamp.seconds * 1000), 'hh:mm a') }</Text>
                  </Stack>
                  <Stack w={'full'}>
                    <Text fontWeight={'semibold'}>Type</Text>
                    <Text marginTop={'unset !important'} textTransform={'capitalize'}>{ formatAttendanceType(attendance.type) }</Text>
                  </Stack>
                </Flex>
                <Divider />
                <Box paddingX={4}>
                  <Text fontWeight={'semibold'}>Date</Text>
                  <Text>{ format(new Date(attendance.timestamp.seconds * 1000), 'ccc, dd MMM yyyy') }</Text>
                </Box>
                <Divider />
                <Box paddingX={4}>
                  <Text fontWeight={'semibold'}>Notes</Text>
                  <Text>{ attendance.note || '-' }</Text>
                </Box>
              </Stack>
            </Box>
          </Flex>
        </Box>
        ) : null }
      </Flex>
    </>
    );
  }
  
  export default AttendanceDetail
  