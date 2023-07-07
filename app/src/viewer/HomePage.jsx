import React, { useState } from 'react';
import MangaViewer from './MangaViewer';
import Settings from './Settings';


const HomePage = () => {

    // A state to store the show viewer flag
    const [showViewer, setShowViewer] = useState(false);
    // A state to store the directory value
    const [directory, setDirectory] = useState('Default');

    // A state to store the series value
    const [series, setSeries] = useState('one-piece');

    // A state to store the chapter value
    const [chapter, setChapter] = useState('1');

    return (
        <div>
            
            {showViewer ? <MangaViewer directory={directory} series={series} chapter={chapter} /> 
                        : 
            <Settings  directory={directory} series={series} chapter={chapter} setShowViewer={setShowViewer} setDirectory={setDirectory} setSeries={setSeries} setChapter={setChapter}/>
            }
        </div>
    )
};

export default HomePage;
