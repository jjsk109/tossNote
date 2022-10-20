/**
 * 토스 결제 
 * 토스 문서에 내용이 되어있음
 * 내가 보기 좋게 정리함
 * https://docs.tosspayments.com/guides/overview
 * 여기에 다 있긴함
 */


const axios = require("axios");
import { loadTossPayments } from '@tosspayments/payment-sdk'; 


const cancel = async () => {
  const secretKeyBase64 = Buffer.from(process.env.REACT_APP_TOSS_SECRET_KEY + ':').toString('base64'); // 비밀키 64 base 인코딩
  
  const options = {
    method: 'POST',
    url: 'https://api.tosspayments.com/v1/payments/토스결제키/cancel',
    headers: {
      Authorization: `Basic ${secretKeyBase64}`,
      'Content-Type': 'application/json'
    },
    data: {
      cancelReason: '고객이 취소를 원함',
      cancelAmount: 1000,
      refundReceiveAccount: { bank: '은행명', accountNumber: '받는계좌', holderName: '계좌주' },
      refundableAmount: 1000
    },
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

}

const pay = async () => {
  loadTossPayments(process.env.REACT_APP_TOSS_CLIENT_KEY).then(tossPayments => {
    const currentUrl = new URL(window.location.href); // 현 URL
    const mehtod = '카드' // 카드, 휴대폰, 계좌이체, 가상계좌
    tossPayments.requestPayment(mehtod, { // 결제 수단 파라미터
      // 결제 정보 파라미터
      amount: 1000,
      orderId: '주문아이디',
      orderName: `빠른 결제`,
      customerName: user.name,
      successUrl: `${currentUrl.origin}/success`,
      failUrl: `${currentUrl.href}`,
    })
  })
}

