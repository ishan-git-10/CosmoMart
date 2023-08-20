import React from "react";
import {Row, Col, Carousel,Image} from "react-bootstrap";
import Product from "../Components/Product";
import {useGetProductsQuery} from "../slices/productsApiSlice";
import Loading from "../Components/Loading";
import Message from "../Components/Message";
import { Link } from "react-router-dom";
import {FaRupeeSign} from "react-icons/fa";
import "./HomeScreen.css";

function HomeScreen(){

    const {data: products, isLoading, error} = useGetProductsQuery();
    let productsList=[];
    let carProducts=[];
    if(!isLoading){
    productsList= products;
    productsList=productsList.slice().reverse();
    carProducts = products;
    carProducts=carProducts.slice().sort((a, b) => (
        a.price < b.price ? 1 : b.price < a.price ? -1 : 0));
    }

    return(
        <>
        {isLoading?(<Loading />):error?(
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>):(
            <>
                
                <h2 className="my-4 text-center mt-4">Shop by Categories</h2>
                <Row className="mb-5 px-4">
                    <Col className="text-center" xs={3}>
                        <Link to="/category/phone" className="category">
                            <Image src={require("./images/phone.jpg")} className="w-50 category-image" roundedCircle></Image>
                            <p><strong>Phones</strong></p>
                        </Link>
                    </Col>
                    <Col className="text-center" xs={3}>
                        <Link to="/category/camera" className="category" >
                            <Image src={require("./images/camera.jpg")} className="w-50 category-image" roundedCircle></Image>
                            <p><strong>Cameras</strong></p>
                        </Link>
                    </Col>
                    <Col className="text-center" xs={3}>
                        <Link to="/category/accessories" className="category">
                            <Image src={require("./images/accessories.jpg")} className="w-50 category-image" roundedCircle></Image>
                            <p><strong>Accessories</strong></p>
                        </Link>
                    </Col>
                    <Col className="text-center" xs={3}>
                        <Link to="/category/others" className="category">
                            <Image src={require("./images/others.jpg")} className="w-50 category-image" roundedCircle></Image>
                            <p><strong>Others</strong></p>
                        </Link>
                    </Col>
                </Row>
                <hr />
                <h1 className="my-4 text-center">Top Deals</h1>
                <Row className="mb-3">
                    <Carousel fade variant="dark">
                        {carProducts.slice(0,3).map((product)=>(
                            <Carousel.Item key={product._id} className="pb-5">
                                <Link to={"/product/"+product._id}>
                                    <Row className="pb-5 d-flex justify-content-center">
                                        <Col lg={6} className="d-flex justify-content-center">
                                            <Image src={product.image} className="car-image mb-5" />     
                                        </Col>                                    
                                    </Row>
                                
                                <Carousel.Caption className="carousel-caption"> 
                                <h3 className="pt-5">{product.name}</h3>
                                <h5><FaRupeeSign className="fs-6 mb-1" />{product.price}</h5>                                 
                                </Carousel.Caption>
                            </Link>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Row>
                <hr />
                <h1 className="my-4 text-center mt-5">Latest Products</h1>
                <Row className="mb-5 d-flex justify-content-center">
                    {productsList.map((product)=>(
                        <Col key={product._id} xs={6} sm={6} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
                
            </>
        )}
            
        </>
    )
}

export default HomeScreen;