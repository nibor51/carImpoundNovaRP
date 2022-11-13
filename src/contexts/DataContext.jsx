import { createContext, useContext } from "react";
import { useCSV } from "../services";


const dataContext = createContext(
  [{
    id: 1,
    immat: "ABC1234",
    picture: "#",
    ownerName: "null",
    impound: true,
  },
  {
    id: 2,
    immat: "ABC1234",
    picture: "#",
    ownerName: "null",
    impound: false,
  }]
);

export function DataProvider({ children }) {
  const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRh5igZ4-rIFMZkWRGGCW0RZ9qIUmY9SGsYJlLF2kmadoOWZEywEd2JEBHBVzEOKlVDwtVlMF7eB3jO/pub?gid=325965697&single=true&output=csv";
  const data = useCSV(dataUrl);

  const { Provider } = dataContext;

  return <Provider value={data}>{children}</Provider>;
}

export const useData = () => useContext(dataContext);
