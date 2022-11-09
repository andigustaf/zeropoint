import { Avatar, Button, HStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { Column } from "react-table";
import Datatable from ".";
import { ListProps, User } from "../../types";

const ListEmployee = ({
  data,
  isLoading,
  pagination,
  setPagination,
  total,
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
      Header: 'Email',
      accessor: 'email',
    },
    // {
    //   Header: "Tindakan",
    //   Cell: ({ row }) => (
    //     <HStack>
    //       <Button size="sm">Edit</Button>
    //       <Button size="sm">Delete</Button>
    //     </HStack>
    //   ),
    // }
  ], []);
  return (
    <Datatable
      columns={columns}
      data={data}
      pagination={pagination}
      isLoading={isLoading}
      setPagination={setPagination}
      total={total}
    />
  );
};

export default ListEmployee;
