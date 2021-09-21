import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export const ProductDetails = () => {
  //store the id of the item clicked by the user from the
  const { _id } = useParams();
  //this will store all products from fetch
  const [product, setProduct] = useState();
  //will become true after the data from fetch as been stored
  const [isLoaded, setIsLoaded] = useState(false);

  //retrieve all products
  useEffect(() => {
    fetch(`/products/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [_id]);

  const handleClick = (e) => {
    if (localStorage.getItem("productInfo") === null) {
      localStorage.setItem("productInfo", JSON.stringify([]));
    }
    const productArray = JSON.parse(localStorage.getItem("productInfo"));

    productArray.push(product);

    localStorage.setItem("productInfo", JSON.stringify(productArray));
  };

  return (
    <Wrapper>
      {isLoaded ? (
        <>
          <Container1>
            <Img src={product.imageSrc} />
          </Container1>
          <Container2>
            <h2>{product.name}</h2>
            <h3>Category: {product.category}</h3>
            <h3>Body Location: {product.body_location}</h3>
            <h3>Price: {product.price}</h3>
            <h3>Number of Stock: {product.numInStock}</h3>
            {product.numInStock > 0 && (
              <Button onClick={handleClick}>Add to cart</Button>
            )}
          </Container2>
        </>
      ) : (
        <h2>Loading..</h2>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  font-family: "Oswald", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container1 = styled.div`
  height: 500px;
  width: 500px;
  font-family: "Oswald", sans-serif;
  box-shadow: 5px 5px 4px #888888;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container2 = styled.div`
  height: 400px;
  width: 400px;
  font-family: "Oswald", sans-serif;
  border-radius: 20px;
  background-color: #b9b7b7;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Img = styled.img`
  height: 80%;
  width: 80%;
`;

const Button = styled.button`
  background-color: white;
  border: none;
  color: #555555;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #555555;
    color: white;
  }
`;
