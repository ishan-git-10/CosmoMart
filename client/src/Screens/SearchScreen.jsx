import React from "react";
import {Row, Col, Button} from "react-bootstrap";
import Product from "../Components/Product";
import {useGetSearchProductsQuery} from "../slices/productsApiSlice";
import Loading from "../Components/Loading";
import Message from "../Components/Message";
import { Link, useParams} from "react-router-dom";
import "./HomeScreen.css";

function SearchScreen(){
    
    const {searchitem:searchItem} = useParams();
    const {data: products, isLoading, error} = useGetSearchProductsQuery(searchItem);


    return(
        <>
            {isLoading?(<Loading />):error?(<div className="pt-5">
                <Message variant='danger'>
                <p>No results found... Try searching some other products OR Go to Home.</p>
                <Link to="/">
                    <Button className="my-2" variant="secondary">Home</Button>
                </Link>
                </Message>
        </div>):(
            <>
                <Link to="/">
                    <Button className="mt-4" variant="secondary">Home</Button>
                </Link>
                <h2 className="my-4 mt-4">Search Results:</h2>
                <Row className="mb-5 d-flex justify-content-center">
                    {products.map((product)=>(
                        <Col key={product._id} xs={6} sm={6} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>               
            </>
        )}
        </>
    );
}

export default SearchScreen;