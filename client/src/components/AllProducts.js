import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

//This page will show all products from the store.
export const AllProducts = () => {
  //this will store all products from fetch
  const [products, setProducts] = useState();
  //will become true after the data from fetch as been stored
  const [isLoaded, setIsLoaded] = useState(false);

  //retrieve all products
  useEffect(() => {
    fetch(`/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <Wrapper>
      <Title>
        <h1>All Products</h1>
      </Title>
      {isLoaded ? (
        <>
          <Container>
            {products.map((product) => {
              return (
                <Link
                  to={`/details/${product._id}`}
                  style={{ textDecoration: "none" }}
                  key={product._id}
                >
                  <Card>
                    <Img src={product.imageSrc} />
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                  </Card>
                </Link>
              );
            })}
          </Container>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  font-family: "Oswald", sans-serif;
`;

const Card = styled.div`
  background-color: white;
  height: 250px;
  width: 250px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid white;
  padding: 10px;
  margin: 10px;
  box-shadow: 5px 5px 4px #888888;
  border-radius: 20px;
  color: black;
`;

const Img = styled.img`
  height: 100px;
  width: 100px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
`;
