import { React } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import {FaRupeeSign} from "react-icons/fa";

function Product({product}) {
    return(
        <Card className="my-3 p-3 rounded">
            <Link to={"/product/"+product._id}>
                <Card.Img src={product.image} variant="top" />
            </Link>
            <Card.Body>
            <Link to={"/product/"+product._id} className="card-link-title">
                <Card.Title className="product-title">
                {product.name}
                </Card.Title>
            </Link>
            <Rating value={product.rating} text={product.numReviews} />
            <Card.Text className="mt-2 fs-4"><FaRupeeSign className="fs-6 mb-1" /> {product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;