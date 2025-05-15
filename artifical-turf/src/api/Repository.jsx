import axios from 'axios';
import { data } from 'react-router-dom';

const BASE_URL = 'https://v1.nocodeapi.com/emirrrcivelek/google_sheets/NWpXFROecVIRaBbn?';



export const onLogin = async (values) => {
  const EDITED_BASE_URL = BASE_URL + "tabId=user";

  try {
    const response = await axios.get(EDITED_BASE_URL);
    const users = response.data.data;

    if(values.userName.trim() === "admin@gmail.com" && values.userPass.trim() === "123"){
      return {
          success: true , isAdmin:true
      }
    }

    const isThereUser = users.find(
      (item) =>
        item.userName?.trim() === values.userName.trim() &&
        item.userPass?.trim() === values.userPass.trim()
    );


    if (isThereUser) {
      return { success: true, user: isThereUser , isAdmin:false };
    } else {
      return { success: false, message: 'Kullanıcı adı veya şifre hatalı.' };
    }
  } catch (error) {
    console.error("Login işlemi sırasında hata oluştu:", error);
    return { success: false, message: 'Bir hata oluştu.' };
  }
};

export const onRegister = async (value) => {
  const EDITED_BASE_URL = BASE_URL + "tabId=user";

  const dataToSend = [
    [value.userName, value.userPass]
  ]

  try {
    const response = await axios.post(EDITED_BASE_URL, dataToSend, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log("Başarılı:", response);
    return response;
  } catch (error) {
    console.error("Kayıt sırasında hata oluştu:", error.response?.data || error.message);
    throw error;
  }
};

export const addToCart = async (value) => {

  console.log(value)

  const dataToSend = [
    [value.userId, value.fieldId ,value.fieldName,value.fieldPrice, value.startDate, value.startTime, value.endDate, value.endTime, value.isReserved]
  ]

  console.log(dataToSend)


  const EDITED_BASE_URL = BASE_URL + "tabId=carts";
  try {
    const response = await axios.post(EDITED_BASE_URL, dataToSend);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Sepete ekleme sırasında hata oluştu:", error);
    throw error;
  }
};

export const createReservation = async (value) => {
  const EDITED_BASE_URL = BASE_URL + "tabId=carts&row_id="+value.row_id;
  try {
    const response = await axios.put(EDITED_BASE_URL, value);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Rezervasyon sırasında hata oluştu:", error);
    throw error;
  }
};

export const getAllFields = async () => {
  const EDITED_BASE_URL = BASE_URL + "tabId=fields";
  try {
    const response = await axios.get(EDITED_BASE_URL);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Rezervasyon sırasında hata oluştu:", error);
    throw error;
  }
};

export const getFieldsById = async () => {
  const EDITED_BASE_URL = BASE_URL + "tabId=fields";
  try {
    const response = await axios.get(EDITED_BASE_URL);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Rezervasyon sırasında hata oluştu:", error);
    throw error;
  }
};

export const addField = async (values) => {
  const EDITED_BASE_URL = BASE_URL + "tabId=fields";

  try {
    const currentFields = await getAllFields();

    const filteredFields = currentFields.data.data.filter((item) =>
      item.fieldName == values.fieldName
    )

    if (filteredFields[0] != null) {
      console.log(filteredFields)
      return { success: false, message: "Bu halısaha zaten mevcut" };
    }

    const dataToSend = [
      [values.fieldName, values.fieldPrice]
    ];

    const response = await axios.post(EDITED_BASE_URL, dataToSend);
    console.log(response);
    return { success: true, data: response };
  } catch (error) {
    console.error("Halısaha eklenirken hata oluştu:", error);
    throw error;
  }
};

export const getCartListByUserId = async (userId) => {
  const EDITED_BASE_URL = BASE_URL + "tabId=carts";

  try {
    const response = await axios.get(EDITED_BASE_URL);
    console.log(response);

    const filteredResponse = response.data.data.filter((item) =>
      item.userId == userId && item.isReserved == "FALSE"
    )

   return filteredResponse

  } catch (error) {
    console.error("Halısaha eklenirken hata oluştu:", error);
    throw error;
  }
};

export const deleteFromCartList = async (cartId) => {
  const EDITED_BASE_URL = BASE_URL + "tabId=carts&row_id="+cartId;

  try {
    const response = await axios.delete(EDITED_BASE_URL);
    console.log(response);

    return { success: true, data: response };
  } catch (error) {
    console.error("Halısaha eklenirken hata oluştu:", error);
    throw error;
  }

}

export const cancelReservation = async (item) => {

  console.log(item.row_id)
  
  const EDITED_BASE_URL = BASE_URL + "tabId=carts&row_id="+item.row_id;


  try {
    const response = await axios.delete(EDITED_BASE_URL);
    console.log(response);

    return { success: true, data: response };
  } catch (error) {
    console.error("Halısaha eklenirken hata oluştu:", error);
    throw error;
  }

}


export const updateCartItem = async (cartId) => {
  const EDITED_BASE_URL = BASE_URL + "tabId=carts";

  try {
    const response = await axios.delete(EDITED_BASE_URL, cartId);
    console.log(response);

    return { success: true, data: response };
  } catch (error) {
    console.error("Halısaha eklenirken hata oluştu:", error);
    throw error;
  }

}

export const getAllReserves = async (fieldId) => {
  const EDITED_BASE_URL = BASE_URL + "tabId=carts";
  
  try {
    const response = await axios.get(EDITED_BASE_URL);
    console.log(response);

    const filteredResponse = response.data.data.filter((item) =>
      item.fieldId == fieldId && item.isReserved == "TRUE"
    )

    console.log("abc"+filteredResponse)

   return filteredResponse

  } catch (error) {
    console.error("Halısaha eklenirken hata oluştu:", error);
    throw error;
  }
};

export const getAllReservesOnPage = async (userId) => {
  const EDITED_BASE_URL = BASE_URL + "tabId=carts";
  
  try {
    const response = await axios.get(EDITED_BASE_URL);
    console.log(response);

    const filteredResponse = response.data.data.filter((item) =>
      item.userId == userId && item.isReserved == "TRUE"
    )

    console.log("abc"+filteredResponse)

   return filteredResponse

  } catch (error) {
    console.error("Halısaha eklenirken hata oluştu:", error);
    throw error;
  }
};