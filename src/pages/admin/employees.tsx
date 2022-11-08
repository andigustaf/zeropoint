import { useState } from "react";
import ListEmployee from "../../components/datatables/ListEmployee";
import HeaderPage from "../../components/headers/HeaderPage";

const Employee = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    search: "",
  });
  
  return (
    <>
      <HeaderPage
        title="Karyawan"
        desc="Daftar karyawan akan ditampilkan di halaman ini"
      />
      <ListEmployee
        data={[
          {
            name: "Alfarady",
            email: "alfarady@team.ngorder.id"
          }
        ]}
        pagination={pagination}
        setPagination={setPagination}
        total={1}
        isLoading={false}
      />
    </>
  );
};

export default Employee;
