import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import ReadOnlyRow from "./Components/ReadOnlyRow";
import EditableRow from "./Components/EditableRow";
import ReactPaginate from "react-paginate";
import "./App.css"

export default function Example() {
  //--------------------------------------------Get Clients from DB--------------------------------------------

  const clientsCollectionRef = collection(db, "clients");

  useEffect(() => {
    const getClients = async () => {
      const data = await getDocs(clientsCollectionRef);
      setLinha(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getClients()
  },[]);

  //--------------------------------------------InsertButton useStates---------------------------------------
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [civil, setCivil] = useState("");
  const [cpf, setCpf] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const [linha, setLinha] = useState([]);

  const [editId, setEditId] = useState(null);

  //------------------------------------------EditButton useStates-------------------------------------------
  const [editValues, setEditValues] = useState({
    nome: "",
    idade: "",
    civil: "",
    cpf: "",
    cidade: "",
    estado: "",
  });

  //------------------------------------------Render Input Fields--------------------------------------------

  function InputFields() {
    return (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="ml-4">
              <div className="text-sm font-medium text-black-900">             
                <form>
                <input
                  type="text"
                  value={nome}
                  placeholder="Nome"
                  onChange={(e) => setNome(e.target.value)}
                  className="bg-gray-200 rounded text-center"
                />
                </form>
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-black-900">
            <form>
            <input
              type="text"
              value={idade}
              placeholder="Idade"
              onChange={(e) => setIdade(e.target.value)}
              className="bg-slate-200 w-16 rounded text-center"
            />
            </form>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
          <form>
            <input
            type="text"
            value={civil}
            placeholder="Estado Civil"
            onChange={(e) => setCivil(e.target.value)}
            className="bg-gray-200 w-24 rounded text-center"
          />
          </form>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
          <form>
          <input
            type="text"
            value={cpf}
            placeholder="CPF"
            onChange={(e) => setCpf(e.target.value)}
            className="bg-gray-200 w-2/3 rounded text-center"
          />
          </form>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
          <form>
          <input
            type="text"
            value={cidade}
            placeholder="Cidade"
            onChange={(e) => setCidade(e.target.value)}
            className="bg-gray-200 rounded text-center"
          />
          </form>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
          <form>
          <input
            type="text"
            value={estado}
            placeholder="Estado"
            onChange={(e) => setEstado(e.target.value)}
            className="bg-gray-200 w-2/3 rounded text-center"
          />
          </form>
        </td>
        <td>
          <button
            class="bg-indigo-500 transition duration-200 hover:scale-110 ease-in-out rounded-lg w-24 h-10 self-end mt-2 shadow-xl font-semibold ml-2 mb-1"
            type="submit"
            onClick={HandleInsert}
          >
            Inserir
          </button>
        </td>
      </tr>
    );
  }

  // -------------------------------------------Handle Insert--------------------------------------------------
  const HandleInsert = async () => {
    await addDoc(clientsCollectionRef, {
      nome: nome,
      idade: idade,
      civil: civil,
      cpf: cpf,
      cidade: cidade,
      estado: estado,
    });
    setNome("");
    setIdade("");
    setCivil("");
    setCpf("");
    setCidade("");
    setEstado("");
    const getClients = async () => {
      const data = await getDocs(clientsCollectionRef);
      setLinha(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getClients();
  };

  //--------------------------------------------Handle Delete--------------------------------------------------
  const HandleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este usuário ?")) {
      const clientDoc = doc(db, "clients", id);
      await deleteDoc(clientDoc);
      const getClients = async () => {
        const data = await getDocs(clientsCollectionRef);
        setLinha(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      getClients();
    }
  };

  //--------------------------------------------Handle Edit----------------------------------------------------
  const HandleEditClick = async (cliente) => {
    setEditId(cliente.id);
    const formValues = {
      nome: cliente.nome,
      idade: cliente.idade,
      civil: cliente.civil,
      cpf: cliente.cpf,
      cidade: cliente.cidade,
      estado: cliente.estado,
    };

    setEditValues(formValues);
  };

  const HandleEditSubmit = async (event) => {
    const fieldName = event.target.getAttribute("id");
    const fieldValues = event.target.value;

    const newFormData = { ...editValues };
    newFormData[fieldName] = fieldValues;

    setEditValues(newFormData);
  };

  const HandleEditFormSubmit = async (event) => {
    const editedClient = {
      id: editId,
      nome: editValues.nome,
      idade: editValues.idade,
      civil: editValues.civil,
      cpf: editValues.cpf,
      cidade: editValues.cidade,
      estado: editValues.estado,
    };

    const clientDoc = doc(db, "clients", editedClient.id);
    await updateDoc(clientDoc, editedClient);
    const getClients = async () => {
      const data = await getDocs(clientsCollectionRef);
      setLinha(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getClients();
    setEditId(null);
  };

  const HandleEditCancel = (event) => {
    setEditId(null);
  };

  //---------------------------------------------Pagination----------------------------------------------------
  const [pageNumber, setPageNumber] = useState(0);

  const clientsPerPage = 6;
  const pagesVisited = pageNumber * clientsPerPage;

  const displayClients = linha
    .slice(pagesVisited, pagesVisited + clientsPerPage)
    .map((clients) => {
      return (
        <>
          {editId === clients.id ? (
            <EditableRow
              editValues={editValues}
              HandleEditSubmit={HandleEditSubmit}
              HandleEditFormSubmit={HandleEditFormSubmit}
              HandleEditCancel={HandleEditCancel}
            />
          ) : (
            <ReadOnlyRow
              props={clients}
              HandleEditClick={HandleEditClick}
              HandleDelete={HandleDelete}
            />
          )}
        </>
      );
    });

  const pageCount = Math.ceil(linha.length / clientsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //--------------------------------------------Renders it all-------------------------------------------

  return (
    <div className="container mx-auto mt-12 text-blac-600">
      <h1 className="text-4xl">Tabela de Clientes</h1>
      <br></br>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nome
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Idade
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Estado Civil
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      CPF
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cidade
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Estado
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Botões
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayClients}
                  {InputFields()}
                </tbody>
              </table>
              <div className="flex justify-center text-gray-500 bg-gray-100">
                <ReactPaginate
                  className="flex gap-4 font-size text-base"
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationButtons"}
                  previousLinkClassName={"previousButton"}
                  nextLinkClassName={"nextButton"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
