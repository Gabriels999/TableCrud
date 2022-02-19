import React, { useState, useEffect } from "react";
import { db } from "./firebase-config"
import { collection, getDocs, addDoc } from "firebase/firestore"
import "./App.css";
import ReadOnlyRow from "./Components/ReadOnlyRow";
import EditableRow from "./Components/EditableRow";
import { ImArrowRight } from "react-icons/im";

export default function Example() {

  const clientsCollectionRef = collection(db, "clients")

  useEffect(()=>{

    const getClients = async () =>{
      const data = await getDocs(clientsCollectionRef)
      console.log(data)
      setLinha(data.docs.map((doc)=>({ ...doc.data(), id: doc.id })))
      console.log(linha)
    }
    
    getClients()
  }, [])


  //--------------------------------------------InsertButton useStates------------------------------------
  const [count, setCount] = useState(3);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [civil, setCivil] = useState('');
  const [cpf, setCpf] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const [linha, setLinha] = useState([]);

  const [editId, setEditId] = useState(null);
  //------------------------------------------EditButton useStates---------------------------------------
  const [editValues, setEditValues] = useState({
    nome: "",
    idade: "",
    civil: "",
    cpf: "",
    cidade: "",
    estado: "",
  });
  //-------------------------------------------------------------------------------------------------------

  function InputFields() {
    return (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="ml-4">
              <div className="text-sm font-medium text-black-900">
                <input
                  type="text"
                  value={nome}
                  placeholder="Nome"
                  onChange={(e) => setNome(e.target.value)}
                  className="bg-gray-200 rounded text-center"
                />
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-black-900">
            <input
              type="text"
              value={idade}
              placeholder="Idade"
              onChange={(e) => setIdade(e.target.value)}
              className="bg-slate-200 w-16 rounded text-center"
            />
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
          <input
            type="text"
            value={civil}
            placeholder="Estado Civil"
            onChange={(e) => setCivil(e.target.value)}
            className="bg-gray-200 w-24 rounded text-center"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
          <input
            type="text"
            value={cpf}
            placeholder="CPF"
            onChange={(e) => setCpf(e.target.value)}
            className="bg-gray-200 w-2/3 rounded text-center"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
          <input
            type="text"
            value={cidade}
            placeholder="Cidade"
            onChange={(e) => setCidade(e.target.value)}
            className="bg-gray-200 rounded text-center"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
          <input
            type="text"
            value={estado}
            placeholder="Estado"
            onChange={(e) => setEstado(e.target.value)}
            className="bg-gray-200 w-2/3 rounded text-center"
          />
        </td>
        <td>
          <button
            class="bg-indigo-500 transition duration-200 hover:scale-110 ease-in-out rounded-lg w-24 h-10 self-end mt-2 shadow-xl font-semibold ml-2"
            type="submit"
            onClick={HandleInsert}
          >
            Inserir
          </button>
        </td>
      </tr>
    );
  }

  const HandleInsert = async () => {
    await addDoc(clientsCollectionRef, {nome: nome, idade: idade, civil: civil, cpf:cpf, cidade:cidade, estado:estado})
    setCount(count + 1);
    setLinha([
      ...linha,
      {
        id: count,
        nome: nome,
        idade: idade,
        civil: civil,
        cpf: cpf,
        cidade: cidade,
        estado: estado,
      },
    ]);
    console.log(linha)
    setNome("")
    setIdade("")
    setCivil("")
    setCpf("")
    setCidade("")
    setEstado("")
  }

  const HandleDelete = (event, id) => {
    if (window.confirm("Deseja realmente excluir este usuário ?")) {
      const novaLinha = linha.filter((linha) => {
        return linha.id !== id;
      });
      setLinha(novaLinha);
    }
  };

  const HandleEditClick = (event, cliente) => {
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

  const HandleEditSubmit = (event) => {
    const fieldName = event.target.getAttribute("id");
    const fieldValues = event.target.value;

    const newFormData = { ...editValues };
    newFormData[fieldName] = fieldValues;

    setEditValues(newFormData);
  };

  const HandleEditFormSubmit = (event) => {
    const editedClient = {
      id: editId,
      nome: editValues.nome,
      idade: editValues.idade,
      civil: editValues.civil,
      cpf: editValues.cpf,
      cidade: editValues.cidade,
      estado: editValues.estado,
    };

    const newClientList = [...linha];
    const index = linha.findIndex((linha) => linha.id === editedClient.id);

    newClientList[index] = editedClient;

    setLinha(newClientList);
    setEditId(null);
  };

  const HandleEditCancel = (event) => {
    setEditId(null);
  };

  return (
    <div className="container mx-auto mt-12 text-blac-600">
      <h1 className="text-4xl">Tabela de Clientes</h1>
      <br></br>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
                  {linha.map((cliente) => (
                    <>
                      {editId === cliente.id ? (
                        <EditableRow
                          editValues={editValues}
                          HandleEditSubmit={HandleEditSubmit}
                          HandleEditFormSubmit={HandleEditFormSubmit}
                          HandleEditCancel={HandleEditCancel}
                        />
                      ) : (
                        <ReadOnlyRow
                          props={cliente}
                          HandleEditClick={HandleEditClick}
                          HandleDelete={HandleDelete}
                        />
                      )}
                    </>
                  ))}
                  {InputFields()}
                </tbody>
              </table>
              <div className="flex justify-center">
                <a href="#a">
                  <ImArrowRight className="text-indigo-500 text-2xl mb-2" />
                </a>
                {" "}
              </div>
            </div>
          </div>
        </div>
        <h1>ID atual: {count}</h1>
      </div>
    </div>
  );
}
