import {Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state)=> state.ui.notification);

  const cart = useSelector((state) =>state.cart);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending',
          message: 'Sending cart data',
        })
      )
      const reponse = await fetch (
        'https://react-http-6d293-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }    
      );
      if (!reponse.ok){
        throw new Error('Sending cart data failed');
      }

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sending cart data successfully!',
        })
      );
    };
    if (isInitial){
      isInitial = false;
      return
    }
    
    sendCartData().catch((error)=>{
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Sending cart data failed',
        })
      )
    })
    
  }, [cart, dispatch]); // za kazdym razem przy zmianie cart zostaje dodany stan do firebase

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
       <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
   
  );
}

export default App;
