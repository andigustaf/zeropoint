import { Box, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  desc?: string;
  right?: JSX.Element;
}

const HeaderPage = ({ title, desc, right }: Props) => {
  return (
    <Box
      display="flex"
      flexDir={["column", "column", "row", "row"]}
      alignItems="center"
      justifyContent="space-between"
    >
      <Box mb={8}>
        <Text color="gray.800" fontSize="2xl" fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="md" color="gray.600">
          {desc}
        </Text>
      </Box>
      {right}
    </Box>
  );
};

export default HeaderPage;
