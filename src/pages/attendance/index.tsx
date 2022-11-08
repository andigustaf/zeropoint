import { Box, Button, Flex, Grid, GridItem, Heading, Stack, Table, TableContainer, Tag, Tbody, Td, Text, Tr } from '@chakra-ui/react'
import { collection, onSnapshot, query, where, Timestamp} from "firebase/firestore";
import { firestore } from '../../config/firebase';
import { WarningIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useAttendance } from '../../context/AttendanceContext';
import { useRouter } from 'next/router';
import { Navbar } from '../../components/Navbar';

const Index = () => {
  const { user } = useAuth()
  const router = useRouter()
  const { attendance, setAttendance } = useAttendance()
  const [dateState, setDateState] = useState(new Date())
  const [attendances, setAttendances] = useState([])

  useEffect(() => {
    const startOfDay = new Date(dateState.getFullYear(), dateState.getMonth(), dateState.getDate(), 0, 0, 0)
    const endOfDay = new Date(dateState.getFullYear(), dateState.getMonth(), dateState.getDate(), 23, 59, 59)
    const q = query(collection(firestore, "checklogs"),
      where('email', '==', user.email),
      where('timestamp', '>=', Timestamp.fromDate(startOfDay)),
      where('timestamp', '<=', Timestamp.fromDate(endOfDay)),
      // limit(6)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = []
      for (const doc of snapshot.docs) {
        items.push({
          id: doc.id,
          data:doc.data()
        })
      }
      setAttendances([...items])
    })

    return () => {
      unsubscribe()
    }
  }, [])
  
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 15000);
  }, []);

  const formatTimestamp = (sec) => {
    let date = new Date(sec);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: 'numeric'
    })
  }

  const formatAttendanceType = (str) => {
    str = str.replace(/_/g, " ")
    str = str.toLowerCase()
    return str
  }

  const gotoForm = (type) => {
    setAttendance({...attendance, type:type, base64Image:'', note: ''})
    router.push('attendance/form')
  }
  
  const gotoDetail = (id : string) => {
    router.push('attendance/' + id)
  }

  const gotoLogs = () => {
    router.push('attendance/logs')
  }
  
  return (
    <>
      <Navbar />
      <Flex
        justify="center"
        minH={"100vh"}
        pt={6}
        bg="gray.100"
        w="full"
      >
        <Box w="full" maxW={"lg"} px={6}>
          <Stack spacing={1}>
            <Heading as='h3' size='md' textAlign={'center'}>
              Live Attendance
            </Heading>

            <Heading size='lg' textAlign={'center'}>
              {dateState.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: 'numeric'
              })}
            </Heading>
            <Text size='sm' align={'center'}>
              {dateState.toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </Text>
          </Stack>

          <Box
            marginTop={6}
            rounded={"lg"}
            bg="white"
            boxShadow={"lg"}
            p={8}
            w="full"
            maxW="md"
          >
            <Tag paddingY={2} w="full" bg="blue.50" fontWeight="normal" justifyContent="center" alignItems="center">
                <WarningIcon />
                <Text size={'xs'} marginLeft={1}>Selfie photo is required to Clock In/Out</Text>
            </Tag>
            <Grid templateColumns='repeat(2, 1fr)' mt={4} gap={6}>
              <GridItem w='100%' h='10'>
                <Button colorScheme='blue' w="full" onClick={() => gotoForm('CLOCK_IN')}>
                  Clock In
                </Button>
              </GridItem>
              <GridItem w='100%' h='10'>
                <Button colorScheme='blue' w="full" onClick={() => gotoForm('CLOCK_OUT')}>
                  Clock Out
                </Button>
              </GridItem>
            </Grid>
          </Box>

          <Box
            rounded={"lg"}
            marginTop={6}
            bg="white"
            boxShadow={"lg"}
            w="full"
            maxW="md"
          >
          <Flex bg="white" justifyContent="space-between" p={2} paddingX={4} roundedTop={"lg"} >
            <Text fontWeight={'semibold'}>Attendance Log</Text>
            {/* <Text><Button onClick={()=>gotoLogs()} size={'sm'} variant={'link'}>View Log</Button></Text> */}
          </Flex>
            <TableContainer>
              <Table variant='simple'>
                  <Tbody>
                    {
                      attendances.map(item => (
                        <Tr key={item.id} _hover={{bg:'gray.50', cursor: 'pointer'}} onClick={()=>gotoDetail(item.id)}>
                          <Td> { formatTimestamp(item.data.timestamp.seconds) } </Td>
                          <Td textTransform={'capitalize'}>{ formatAttendanceType(item.data.type) }</Td>
                          <Td>
                            <Box textAlign="right">
                              <ChevronRightIcon />
                            </Box>
                          </Td>
                        </Tr>
                      ))
                    }
                  </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Flex>
    </>
    );
  }
  
  export default Index
  