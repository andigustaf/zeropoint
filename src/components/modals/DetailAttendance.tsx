
import React from "react"
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, HStack, VStack, Image, Text, SimpleGrid, Stack, Badge, Box, Divider } from "@chakra-ui/react"
import { ModalProps } from "../../types/modal.type"
import { format } from "date-fns";

const defaultImage = 'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg';

const DetailAttendance = ({
  isOpen,
  onOpen,
  onClose,
  data
}: ModalProps) => {
  console.log(data)
  return (
    <>
      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{data?.displayName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align={'stretch'}>
              {data?.clockInData && (
                <Stack direction={['column', 'row']} align={'stretch'} border="2px" borderStyle={'dashed'} borderColor="primary.50" rounded="8" p="2" spacing={'4'}>
                  <Image h={['100%', 200]} w={['100%', 200]} rounded="8" src={data?.clockInData?.image_url} fallbackSrc={defaultImage} alt={data?.displayName} />
                  <VStack w="full" align={'stretch'}>
                    <Box>
                      <Badge colorScheme='green' fontSize={'lg'} rounded="8">Clock In</Badge>
                    </Box>
                    <SimpleGrid columns={2} spacing={4}>
                      <VStack align={'stretch'} spacing="0">
                        <Text fontSize={'sm'} fontWeight={'semibold'}>Clocked Time</Text>
                        <Text fontSize={'sm'}>{data?.clockIn}</Text>
                      </VStack>
                      <VStack align={'stretch'} spacing="0">
                        <Text fontSize={'sm'} fontWeight={'semibold'}>Date</Text>
                        <Text fontSize={'sm'}>{format(data?.clockInData?.timestamp?.toDate(), 'ccc, dd MMM yyyy')}</Text>
                      </VStack>
                      <VStack align={'stretch'} spacing="0">
                        <Text fontSize={'sm'} fontWeight={'semibold'}>Notes</Text>
                        <Text fontSize={'sm'}>{data?.clockInData?.note || '-'}</Text>
                      </VStack>
                      <VStack align={'stretch'} spacing="0">
                        <Text fontSize={'sm'} fontWeight={'semibold'}>Status</Text>
                        <Box>
                          <Badge colorScheme={data?.attendanceStatus == 'WFO' ? 'green' : 'blue'}>{data?.attendanceStatus}</Badge>
                        </Box>
                      </VStack>
                    </SimpleGrid>
                  </VStack>
                </Stack>
              )}
              {data?.clockOutData && (
                <Stack direction={['column', 'row']} align={'stretch'} border="2px" borderStyle={'dashed'} borderColor="primary.50" rounded="8" p="2" spacing={'4'}>
                  <Image h={['100%', 200]} w={['100%', 200]} rounded="8" src={data?.clockOutData?.image_url} fallbackSrc={defaultImage} alt={data?.displayName} />
                  <VStack w="full" align={'stretch'}>
                    <Box>
                      <Badge colorScheme='red' fontSize={'lg'} rounded="8">Clock Out</Badge>
                    </Box>
                    <SimpleGrid columns={2} spacing={4}>
                      <VStack align={'stretch'} spacing="0">
                        <Text fontSize={'sm'} fontWeight={'semibold'}>Clocked Time</Text>
                        <Text fontSize={'sm'}>{data?.clockOut}</Text>
                      </VStack>
                      <VStack align={'stretch'} spacing="0">
                        <Text fontSize={'sm'} fontWeight={'semibold'}>Date</Text>
                        <Text fontSize={'sm'}>{format(data?.clockOutData?.timestamp?.toDate(), 'ccc, dd MMM yyyy')}</Text>
                      </VStack>
                      <VStack align={'stretch'} spacing="0">
                        <Text fontSize={'sm'} fontWeight={'semibold'}>Notes</Text>
                        <Text fontSize={'sm'}>{data?.clockOutData?.note || '-'}</Text>
                      </VStack>
                      <VStack align={'stretch'} spacing="0">
                        <Text fontSize={'sm'} fontWeight={'semibold'}>Status</Text>
                        <Box>
                          <Badge colorScheme={data?.attendanceStatus == 'WFO' ? 'green' : 'blue'}>{data?.attendanceStatus}</Badge>
                        </Box>
                      </VStack>
                    </SimpleGrid>
                  </VStack>
                </Stack>
              )}
              {(!data?.clockInData || !data.clockOutData) && (
                <VStack align={'center'} spacing={'8'}>
                  <Image w="11rem" src="https://app.smartseller.co.id/assets/img/illustration/no_customer.svg"></Image>
                  <Text fontSize={'xl'} fontWeight={'semibold'}>Upss... Not found</Text>
                </VStack>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DetailAttendance;