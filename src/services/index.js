import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import noPicture from '../assets/noPicture.jpg';

const extract = (line) => {
    const newLine = { 
        id: line[0],
        immat: line[1],
        picture: line[2] || noPicture,
    };
    // const re = /(a-zA-Z])/g;
    // const matchedImmat = line[1][0].match(re);
    if (!line[2].includes('http')) {
        newLine.picture = "https://" + line[2]
    }
    return newLine;
};

export function useCSV(url) {
    const [data, setData] = useState(
        [{
            id: 1,
            immat: "ABC1234",
            picture: "#"
          },
          {
            id: 2,
            immat: "ABC1234",
            picture: "#"
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
