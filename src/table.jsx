import { useEffect, useState } from "react";
import styled from "./style.module.css"
import { MdArrowDownward } from "react-icons/md";
import { MdArrowUpward } from "react-icons/md";


function Table({colleges}) {
    const [sortedColleges, setSortedColleges] = useState(colleges);
    const [sortCriteria, setSortCriteria] = useState('collegeduniaRank');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
 
    const sortColleges = (criteria, order,collegesToSort) => {
      const sorted = [...collegesToSort].sort((a, b) => {
        const aValue = parseFloat(a[criteria]);
        const bValue = parseFloat(b[criteria]);
  
        if (isNaN(aValue) || isNaN(bValue)) return 0;
  
        if (aValue === bValue) return 0;
        if (order === 'asc') {
          return aValue < bValue ? -1 : 1;
        } else {
          return aValue > bValue ? -1 : 1;
        }
      });
  
      setSortedColleges(sorted);
    };
  
    const handleSort = (criteria) => {
      if (criteria === sortCriteria) {
        // Toggle the order if sorting by the same criteria
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
      } else {
        // Set the new sorting criteria and default to ascending order
        setSortCriteria(criteria);
        setSortOrder('asc');
      }
    };
  

  
    useEffect(() => {
      // Filter colleges based on search term
      const filteredColleges = colleges.filter((college) =>
        college.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // Sort filtered colleges functiion call sortcolleges
      sortColleges(sortCriteria, sortOrder, filteredColleges); 
    }, [searchTerm, sortCriteria, sortOrder, colleges]);


    return (

        <>
        <label> Search:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
          
    
         
        />

            <table>
                <thead>

                    <tr>
                        <th style={{cursor:"pointer"}} onClick={() => handleSort('collegeduniaRank')}>CD Rank{sortCriteria === 'collegeduniaRank' && sortOrder === 'asc' ? <MdArrowUpward  style={{padding:"0px",margin:"0px",alignItems:"center"}} /> : <MdArrowDownward style={{padding:"0px",margin:"0px",alignItems:"center"}}/>} </th>
                        <th>CollegeName</th>
                        <th style={{cursor:"pointer"}} onClick={()=> handleSort('userReviewRating')}>College Placement{sortCriteria === 'userReviewRating' && sortOrder === 'asc' ? <MdArrowUpward  style={{padding:"0px",margin:"0px",alignItems:"center"}} /> : <MdArrowDownward style={{padding:"0px",margin:"0px",alignItems:"center"}}/>}</th>
                        <th style={{cursor:"pointer"}} onClick={() => handleSort('collegeFees')}>CollegeFees{sortCriteria === 'collegeFees' && sortOrder === 'asc' ? <MdArrowUpward  style={{padding:"0px",margin:"0px",alignItems:"center"}} /> : <MdArrowDownward style={{padding:"0px",margin:"0px",alignItems:"center"}}/>}</th>
                        <th >Reviews</th>
                        <th>Ranking</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedColleges.map((data, index) => {
                        return (
                            <>
                                <tr key={index}>
                                    <td> {data.collegeduniaRank}</td>
                                    <td> {data.collegeName} {data.isfeatured  && (<small style={{backgroundColor:'red',padding:'2px',borderRadius:'9px'}}>Featured</small>)}</td>
                                    <td> Avg Package :- {data.collegePlacement.averagePackage}<br/> <br/>
                                    Highest Package :- {data.collegePlacement.highestPackage}
                                    </td>
                                    <td> {data.collegeFees}</td>
                                    <td>{data.collegeAllIndiaRanking}</td>
                                       <td> {data.userReviewRating}/5</td>
                                   
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>




        </>
    )
}

export default Table