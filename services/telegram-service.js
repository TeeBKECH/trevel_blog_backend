import fetch from 'node-fetch'

export const sendMessage = async (id) => {
  // const productsNames = order.products.map((el) => `${el.title} (${el.count}шт.)\n`).join('')
  // let fields = [
  //   `<b>Заказ - ID</b>: ${order._id}`,
  //   `<b>Имя</b>: ${order.name}`,
  //   `<b>Почта</b>: ${order.email}`,
  //   `<b>Телефон</b>: ${order.phone}`,
  //   `<b>Доставка</b>: ${order.type}`,
  //   `<b>Стоимость</b>: ${order.price} р.`,
  //   `<b>Сообщение</b>: ${order.message}`,
  //   `<b>Адрес</b>: ${order.address}`,
  //   `<b>Время</b>: ${order.time}`,
  //   `<b>Товары</b>: ${productsNames}`,
  //   `<b>Итого</b>: ${order.totalPrice}`,
  // ]
  // let msg = ''
  // let status = {}
  // //проходимся по массиву и склеиваем все в одну строку
  // fields.forEach((field) => {
  //   msg += field + '\n'
  // })
  // //кодируем результат в текст, понятный адресной строке
  // msg = encodeURI(msg)
  // const response = await fetch(
  //   `https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage?chat_id=${process.env.TG_CHAT}&parse_mode=html&text=${msg}`,
  //   { method: 'POST' },
  // )
  // const data = await response.json()
  // if (data.ok) {
  //   status = { status: 'ok', message: 'Заказ успешно создан' }
  // } else {
  //   status = { status: 'error', message: 'Ошибка при создании заказа' }
  // }
  // return status
}
