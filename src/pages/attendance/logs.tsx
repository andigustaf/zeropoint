import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Grid, GridItem, Spacer, Stack, Text } from '@chakra-ui/react'
import { collection, Timestamp, onSnapshot, query, where, limit } from "firebase/firestore";
import { firestore } from '../../config/firebase';
import { CalendarIcon, ChevronRightIcon, EditIcon, TriangleDownIcon } from '@chakra-ui/icons'
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { Navbar } from '../../components/Navbar';

const AttendanceLog = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [dateState, setDateState] = useState(new Date())
  const [attendances, setAttendances] = useState([])

  useEffect(() => {
    const startOfDay = new Date(dateState.getFullYear(), dateState.getMonth(), dateState.getDate(), 0, 0, 0)
    const endOfDay = new Date(dateState.getFullYear(), dateState.getMonth(), dateState.getDate(), 23, 59, 59)
    const q = query(collection(firestore, "checklogs"),
      where('email', '==', user.email),
      where('timestamp', '>=', Timestamp.fromDate(startOfDay)),
      where('timestamp', '<=', Timestamp.fromDate(endOfDay)),
      limit(6)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = []
      for (const doc of snapshot.docs) {
        items.push({id: doc.id, ...doc.data()})
      }
      setAttendances([...items])
    })

    return () => {
      unsubscribe()
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
      minH={"100vh"}
      bg="white"
      w="full"
    >
     <Stack w={'full'}>
      <Box p={4} w={'full'}>
        <Stack gap={1} direction={'row'} alignItems={'center'} w={'full'} borderRadius={'md'} borderWidth={1} paddingY={2} paddingX={4}>
          <CalendarIcon color={'gray.500'} />
          <Text>November 2022</Text>
          <Spacer />
          <TriangleDownIcon color={'gray.500'} />
        </Stack>
      </Box>
      <Accordion defaultIndex={[0]} allowMultiple>
        { attendances.map(attendance => {
          return (
            <AccordionItem paddingX={0} border={'none'} borderBottom={1}>
              <AccordionButton _expanded={{ bg: 'white', color: 'black' }}>
                <Grid templateColumns='repeat(4, 1fr)' alignItems={'center'} paddingX={4} w={'full'}>
                  <GridItem>
                    <Box paddingX={0} textAlign={'left'}>
                      <Text>{ format(new Date(attendance.timestamp.seconds * 1000), 'ccc') }</Text>
                      <Text fontWeight={'semibold'}>{ format(new Date(attendance.timestamp.seconds * 1000), 'dd') }</Text>
                    </Box>
                  </GridItem>
                  <GridItem textAlign={'left'}>
                    <Text>{ format(new Date(attendance.timestamp.seconds * 1000), 'hh:mm a') }</Text>
                  </GridItem>
                  <GridItem textAlign={'left'}>
                    <Text>{ format(new Date(attendance.timestamp.seconds * 1000), 'hh:mm a') }</Text>
                  </GridItem>
                  <GridItem textAlign={'right'} >
                    <Box>
                      <AccordionIcon />
                    </Box>
                  </GridItem>
                </Grid>
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Stack spacing={0}>
                  <Grid templateColumns='repeat(4, 1fr)' alignItems={'center'} margin={0} paddingX={4} paddingY={2} w={'full'} bg={'gray.100'}>
                    <GridItem>
                    </GridItem>
                    <GridItem textAlign={'left'}>
                      <Text>{ format(new Date(attendance.timestamp.seconds * 1000), 'hh:mm a') }</Text>
                    </GridItem>
                    <GridItem textAlign={'left'}>
                      <Text textTransform={'capitalize'}>{ formatAttendanceType(attendance.type) }</Text>
                    </GridItem>
                    <GridItem textAlign={'right'} >
                      <Box>
                        <ChevronRightIcon />
                      </Box>
                    </GridItem>
                  </Grid>
                  <Grid templateColumns='repeat(4, 1fr)' alignItems={'center'} paddingX={4} paddingY={2} w={'full'} bg={'gray.100'}>
                    <GridItem>
                    </GridItem>
                    <GridItem textAlign={'left'}>
                      <Text>{ format(new Date(attendance.timestamp.seconds * 1000), 'hh:mm a') }</Text>
                    </GridItem>
                    <GridItem textAlign={'left'}>
                      <Text textTransform={'capitalize'}>{ formatAttendanceType(attendance.type) }</Text>
                    </GridItem>
                    <GridItem textAlign={'right'} >
                      <Box>
                        <ChevronRightIcon />
                      </Box>
                    </GridItem>
                  </Grid>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          )
        }) }
      </Accordion>
     </Stack>
    </Flex>
  </>
  );
}

export default AttendanceLog
