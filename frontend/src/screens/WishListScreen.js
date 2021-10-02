import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ListGroup from 'react-bootstrap/ListGroup'
import { api } from "../services/api/config";
import { END_POINTS } from "../services/api/endpoints";
import {getLoggedUserProfile} from '../actions/userActions'
import Product from "../components/Product";
import { getToken } from "../actions/userActions";
import { user_config } from "../config/auth";

const WishListScreen = () => {
    const [wishlist, setWishlist] = useState([])
    const removeFromWishList =  async (productId) => {
       const token = getToken()
       if(token) {
           await api.delete(END_POINTS.DELETE_PRODUCT_WISHLIST, {...user_config,   data: {
            _id: productId 
        }}).then(response => {
            console.log(response)
            window.location.reload()
        }).catch(err => {
            alert(err.message)
        })
       }
    }
    useEffect(() => {
        
        (async () => {
           const user = await getLoggedUserProfile()
            await api.get(END_POINTS.GET_USER_WISHLIST, {params: {user: user._id}}).then(response => {
                setWishlist(response?.data?.wishlist)
            }).catch(err => {
                alert(err.message)
            })
        })()
    }, [])

  return (
    <>
      <Header />
      <ListGroup>
      {wishlist.map((product) => (<Product key={product._id} product={product} isWishList  onClick={() => removeFromWishList(product._id)}/>))}
</ListGroup>
    </>
  );
};

export default WishListScreen;
