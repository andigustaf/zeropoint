import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiDownload,
  FiSearch,
} from "react-icons/fi";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import JsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "jspdf-autotable";
import { useExportData } from "react-table-plugins";
import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Skeleton,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Props {
  columns: any;
  data: any[];
  setPagination: any;
  pagination: any;
  total: any;
  header?: JSX.Element;
  side?: JSX.Element;
  searchSize?: string;
  isLoading: boolean;
  useCard?: boolean;
  emptyHeaderText?: string;
  emptyText?: string;
}

interface PropsExportFile {
  columns: any[];
  data: any[];
  fileType: string;
  fileName: string;
}

const Datatable = ({
  columns,
  data = [],
  setPagination,
  pagination,
  total,
  header,
  side,
  searchSize = "70%",
  isLoading = false,
  useCard = true,
  emptyHeaderText = "Belum Ada Data",
  emptyText = "Semua data yang sudah ditambahkan akan muncul disini",
}: Props) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    canNextPage,
    rows,
    exportData,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      getExportFileBlob,
      useControlledState: (state: any) => {
        return React.useMemo(
          () => ({
            ...state,
            pageIndex: pagination.page - 1,
          }),
          [state]
        );
      },
      initialState: { pageIndex: pagination.page - 1 },
      manualPagination: true,
      pageCount: Math.ceil(total / pagination.limit),
    },
    useSortBy,
    usePagination,
    useExportData
  );

  function getExportFileBlob({
    columns,
    data,
    fileType,
    fileName,
  }: PropsExportFile) {
    if (fileType === "csv") {
      // CSV example
      const headerNames = columns
        .filter((c) => c.Header != "Tindakan")
        .map((col) => col.exportValue);
      const csvString = Papa.unparse({ fields: headerNames, data });
      return new Blob([csvString], { type: "text/csv" });
    } else if (fileType === "xlsx") {
      // XLSX example
      const header = columns
        .filter((c) => c.Header != "Tindakan")
        .map((c) => c.exportValue);
      const compatibleData = data.map((row) => {
        const obj: any = {};
        header.forEach((col: any, index: number) => {
          obj[col] = row[index];
        });
        return obj;
      });

      let wb = XLSX.utils.book_new();
      let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
        header,
      });
      XLSX.utils.book_append_sheet(wb, ws1, "Data");
      XLSX.writeFile(wb, `${fileName}.xlsx`);

      // Returning false as downloading of file is already taken care of
      return false;
    }
    //PDF example
    if (fileType === "pdf") {
      const headerNames = columns
        .filter((c) => c.Header != "Tindakan")
        .map((column) => column.exportValue);
      const doc = new JsPDF();
      autoTable(doc, {
        head: [headerNames],
        body: data,
        styles: {
          minCellHeight: 9,
          halign: "left",
          valign: "middle",
          fontSize: 11,
        },
      });
      doc.save(`${fileName}.pdf`);

      return false;
    }

    // Returning false as downloading of file is already taken care of
    return false;
  }

  // Render the UI for your table
  return (
    <Box
      bg={useCard ? "white" : "transparent"}
      w="full"
      borderRadius={useCard ? "lg" : ""}
      boxShadow={useCard ? "sm" : ""}
      p={useCard ? 4 : 0}
      overflowX="auto"
    >
      <VStack bg="gray.50" borderRadius="md" p={3} spacing={4}>
        {header && (
          <Stack
            direction={["column", "column", "row", "row"]}
            w="full"
            spacing={4}
          >
            {header}
          </Stack>
        )}
        <Stack
          direction={["column", "column", "row", "row"]}
          w="full"
          spacing={4}
        >
          <InputGroup w={["", "", "", searchSize]}>
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray.300" />
            </InputLeftElement>
            <Input
              value={pagination.search}
              onChange={(e) =>
                setPagination({ ...pagination, search: e.target.value })
              }
              placeholder="Ketik apa yang anda cari disini..."
            />
          </InputGroup>
          {side}
          <Button
            variant={'outline'}
            size={'sm'}
            onClick={() => exportData("xlsx", true)}
          >
            <Icon as={FiDownload} mr={2} />
            Download Excel
          </Button>
          <Button
            variant={'outline'}
            size={'sm'}
            onClick={() => exportData("pdf", true)}
          >
            <Icon as={FiDownload} mr={2} />
            Download PDF
          </Button>
        </Stack>
      </VStack>
      {isLoading ? (
        <Box
          w="full"
          alignItems="center"
          justifyContent="center"
          minH="250px"
          p={8}
        >
          <Stack spacing={4}>
            <HStack spacing={4}>
              <Skeleton height="30px" w="50%" />
              <Skeleton height="30px" w="25%" />
              <Skeleton height="30px" w="25%" />
            </HStack>
            {[1, 2, 3, 4, 5, 6].map((item) => {
              return (
                <HStack spacing={4} key={item}>
                  <Skeleton height="40px" w="75%" />
                  <Skeleton height="40px" w="25%" />
                </HStack>
              );
            })}
          </Stack>
        </Box>
      ) : data.length > 0 ? (
        <>
          <TableContainer mt={4}>
            <Table {...getTableProps()}>
              <Thead>
                {headerGroups.map((headerGroup: any, idx: number) => (
                  <Tr {...headerGroup.getHeaderGroupProps()} key={idx + 1}>
                    {headerGroup.headers.map((column: any, idx: number) => (
                      <Th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        isNumeric={column.isNumeric}
                        key={idx + 1}
                      >
                        <Text
                          fontWeight="bold"
                          color="gray.600"
                          display="flex"
                          flexDir="row"
                          alignItems="center"
                        >
                          {column.render("Header")}
                          {/* <Box as="span" pl="4"> */}
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <Icon
                                as={FaChevronDown}
                                ml={2}
                                aria-label="sorted descending"
                              />
                            ) : (
                              <Icon
                                as={FaChevronUp}
                                ml={2}
                                aria-label="sorted ascending"
                              />
                            )
                          ) : null}
                          {/* </Box> */}
                        </Text>
                        {/* Add a sort direction indicator */}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {rows.map((row: any, i: number) => {
                  prepareRow(row);
                  return (
                    <Tr {...row.getRowProps()} key={i + 1}>
                      {row.cells.map((cell: any, idx: number) => {
                        return (
                          <Td
                            {...cell.getCellProps({
                              style: {
                                minWidth: cell.column.minWidth,
                                maxWidth: cell.column.maxWidth,
                                width: cell.column.width,
                              },
                            })}
                            fontSize="md"
                            padding="1rem !important"
                            isNumeric={cell.column.isNumeric}
                            key={idx + 1}
                          >
                            {cell.render("Cell")}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Box
          w="full"
          alignItems="center"
          justifyContent="center"
          minH="250px"
          p={8}
        >
          <Text fontWeight="semibold" textAlign="center">
            {emptyHeaderText}
          </Text>
          <Text textAlign="center">{emptyText}</Text>
        </Box>
      )}
      <Box
        display="flex"
        flexDir="row"
        mt={2}
        experimental_spaceX={2}
        bg="gray.50"
        borderRadius="md"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <Text fontWeight="semibold">
          {`${pageIndex === 0 ? 1 : pageIndex * pagination.limit} - ${
            pagination.page * pagination.limit < total
              ? pagination.page * pagination.limit
              : total
              ? total
              : pagination.limit
          }`}{" "}
          of {total ? total : pagination.limit}
        </Text>
        <HStack>
          <Select
            size="sm"
            bg="white"
            border="1px"
            borderRadius="md"
            borderColor="gray.200"
            boxShadow="sm"
            value={pagination.limit}
            onChange={(e) => {
              setPagination({
                ...pagination,
                limit: Number(e.target.value),
              });
            }}
          >
            {[100, 500, 1000].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
          <Button
            size="sm"
            bg="white"
            border="1px"
            borderRadius="md"
            borderColor="gray.200"
            boxShadow="sm"
            disabled={pageIndex === 0}
            onClick={() =>
              setPagination({
                ...pagination,
                page: pagination.page === 1 ? 1 : pagination.page - 1,
              })
            }
          >
            <Icon as={FiChevronLeft} />
          </Button>
          <Button
            size="sm"
            bg="white"
            border="1px"
            borderRadius="md"
            borderColor="gray.200"
            boxShadow="sm"
            disabled={!canNextPage}
            onClick={() =>
              setPagination({
                ...pagination,
                page: pagination.page + 1,
              })
            }
          >
            <Icon as={FiChevronRight} />
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default Datatable;
