import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import noPicture from '../assets/noPicture.jpg';

const extract = (line) => {
    const newLine = { 
        id: line[0],
        immat: line[1],
        picture: line[2] || noPicture,
        ownerName: line[3] || "null",
        impound: line[4],
    };
    if (!line[2].includes('http')) {
        newLine.picture = "https://" + line[2]
    }
    if (line[2].includes('gyazo')) {
        newLine.picture = line[2].replace('gyazo', 'i.gyazo') + ".jpg"
    }
    if (line[4] === "TRUE") {
        newLine.impound = true
    } else {
        newLine.impound = false
    }
    return newLine;
};

export function useCSV(url) {
    const [data, setData] = useState(
        [{
            id: 1,
            immat: "ABC1234",
            picture: noPicture,
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

    useEffect(() => {
        Papa.parse(url, {
            download: true,
            complete: (csv) => {
                const incomingData = csv.data.reduce(
                    (bag, line) => ({ ...bag, [line[0]]: extract(line) }),
                    {}
                  );
                setData(incomingData);
            },
        });
    }, [url]);

    return data;
};
