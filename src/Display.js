import React from "react";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';

import styles from './Display.module.css'

const Display = () => {
    //store information in local storage
    const [information, setInformation] = useState([]);

    //display and show data in HTML
    const [storedData, setStoredData] = useState([]);

    //pagination workflow

    //represent what page I am in
    const [pageNumber, setPageNumber] = useState(0);



    //how many users per page
    const usersPerPage = 25;

    //store pages visited
    const pagesVisited = pageNumber * usersPerPage;


    //  const [toggle, setToggle] = useState(false)

    //remove friend list
    const deletion = (i) => {
        const filtered = storedData.filter(items => items.login.uuid !== i)
        setStoredData(items => [...filtered])
    }




    //display 25 users per page
    const Displayusers = storedData
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((items) => {
            return <ul className={styles.mainHolder}>
                <li key={items.login.uuid} className={styles.data}>
                    <div>
                        <img src={items.picture.large} alt="images" className={styles.imageChanges} />
                        <p>First Name: {items.name.first}</p>
                        <p>Last Name: {items.name.last}</p>
                        <p>Email: {items.email}</p>
                        <p>Phone: {items.phone}</p>
                    </div>
                    <div className={styles.splitButton}>
                        <button className={styles.buttonEditing}>Show Contact</button>
                        <button onClick={() => { deletion(items.login.uuid) }}  className={styles.buttonEditing2}>Unfriend</button>
                    </div>


                </li>
            </ul>

        });





    // produce only 25 per pagination
    const pageCount = Math.ceil(storedData.length / usersPerPage);

    //here to fetch API and store in localstorage
    useEffect(() => {
        fetch("https://randomuser.me/api/?seed=lll&page=1&results=100", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(result => result.json())
            .then(data => {
                //   console.log(data.results[0].name.first)
                //   console.log(data.results)
                setInformation(data.results)


            })
    }, []);


    //here to run the HTML view
    useEffect(() => {
        if (information === '') {
            return
        }
        localStorage.setItem('friends', JSON.stringify(information));
        const newData = JSON.parse(localStorage.getItem('friends'));
        setStoredData(newData)
        // console.log(storedData)
    }, [information])

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return <div className={styles.sortSpacing}>

        <div>
        {Displayusers}
        </div>
       

        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={styles.paginationButtons}
            previousLinkClassName={"previousButton"}
            nextLinkClassName={"nextButton"}
            disabledClassName={"paginationDisabled"}
            activeClassName={styles.paginationActive}

        />
    </div>
}

export default Display;