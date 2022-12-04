import { Avatar, Badge, Button, HStack, Input, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { Column } from "react-table";
import Datatable from ".";
import { ListProps, User } from "../../types";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { format } from 'date-fns';

const ListAttendance = ({
  data,
  isLoading,
  pagination,
  setPagination,
  total,
  onDetailOpen,
}: ListProps) => {
  const columns = useMemo<Column<any>[]>(() => [
    {
      Header: '#',
      maxWidth: 20,
      Cell: ({ row }) => (
        <Avatar name={row?.original?.displayName} src={row?.original?.image} />
      )
    },
    {
      Header: 'Nama',
      accessor: 'displayName',
    },
    {
      Header: 'Clock In',
      accessor: 'clockIn',
      Cell: ({ row }) => row?.original?.clockIn ? (
        <Text textColor={'green.500'}>{row?.original?.clockIn}</Text>
      ) : '-'
    },
    {
      Header: 'Clock Out',
      accessor: 'clockOut',
      Cell: ({ row }) => row?.original?.clockOut ? (
        <Text textColor={'red.500'}>{row?.original?.clockOut}</Text>
      ) : '-'
    },
    {
      Header: 'Jam Bekerja',
      accessor: 'jam',
      Cell: ({ row }) => row?.original?.jam ? (
          <Text textColor={'green.500'}>{row?.original?.jam}</Text>
      ) : '-'
    },
    {
      Header: 'Status Bekerja',
      accessor: 'attendanceStatus',
      Cell: ({ row }) => row?.original?.attendanceStatus !== '-' ? (
        <Badge colorScheme={row?.original?.attendanceStatus == 'WFO' ? 'green' : 'blue'}>{row?.original?.attendanceStatus}</Badge>
      ) : '-'
    },
    {
      Header: "Tindakan",
      Cell: ({ row }) => (
        <HStack>
          <Button size="xs" onClick={() => onDetailOpen(row.original)}>Detail</Button>
        </HStack>
      ),
    }
  ], []);
  return (
    <Datatable
      datefilter={
        <Flatpickr
          options={{
            maxDate: 'today',
            altInput: true,
            altFormat: "d M Y",
            conjunction: "-",
            dateFormat: "Y-m-d",
            defaultDate: format(pagination.date, 'Y-MM-dd')

          }}
          onChange={([date]) => {
            setPagination({
              ...pagination,
              date
            })
          }}
          render={
            ({defaultValue, value, ...props}, ref) => {
              return <Input defaultValue={defaultValue} ref={ref} mt="0px !important" />
            }
          }
        />
      }
      columns={columns}
      data={data}
      pagination={pagination}
      isLoading={isLoading}
      setPagination={setPagination}
      total={total}
    />
  );
};

export default ListAttendance;
