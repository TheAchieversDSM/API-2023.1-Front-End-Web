import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Search from "../components/search";
import TableAlert from "../components/tables/tableAlert";
import TableReport from "../components/tables/tableReports";
import axios from "axios";
import { useParams } from "react-router-dom";
import { parseCookies } from "nookies";
let modelo = {
  alerta_id: "",
  nome: "",
};

export default function Reports() {
  const [alerta, setAlerta] = useState(modelo);
  const { id } = useParams();
  const cookies = parseCookies();
  useEffect(() => {
    function render() {
      axios
        .get(`http://localhost:5000/alerta/pegarAlertasPorId/${id}`, {
          headers: { Authorization: `Bearer ${cookies["tecsus.token"]}` },
        })
        .then((res) => {
          setAlerta(res.data);
        });
    }
    render();
  }, []);

  return (
    <>
      <Sidebar />
      <h1 className="TitImp">
        Reports do Alerta {alerta.nome} ({alerta.alerta_id})
      </h1>

      <TableReport />
    </>
  );
}
