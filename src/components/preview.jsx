import React from 'react';

export default function Preview ({data, search}) {
    return(
        <div>
            <ul>
                {data[search].hits.map((val, ind) => {
                    return(
                        <li key={ind}>
                            {val.title}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}