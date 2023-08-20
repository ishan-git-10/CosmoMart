import React from "react";
import {Row, Col} from "react-bootstrap";
import Product from "../Components/Product";
import {useGetProductsQuery} from "../slices/productsApiSlice";
import Loading from "../Components/Loading";
import Message from "../Components/Message";
import { useParams} from "react-router-dom";
import "./HomeScreen.css";

function CategoryScreen(){
    const {data: products, isLoading, error} = useGetProductsQuery();
    const {cat:category} = useParams();
    let filteredProducts
    if(!isLoading){
    filteredProducts = products.filter((product)=>{
        return product.category.toLowerCase() === category;
    });
    };
    let heading;
    if(category==="phone")
        heading="Phones";
    else if(category==="camera")
        heading="Cameras";
    else if(category==="accessories")
        heading="Accessories";
    else if(category==="others")
        heading="Others";

    return(
        <>
        {isLoading?(<Loading />):error?(
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>):(
            <>

                <h1 className="my-4 text-center mt-4">{heading}</h1>
                <Row className="mb-5 d-flex justify-content-center">
                    {filteredProducts.map((product)=>(
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

export default CategoryScreen;