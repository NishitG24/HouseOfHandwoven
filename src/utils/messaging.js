const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER
const INSTAGRAM_HANDLE = import.meta.env.VITE_INSTAGRAM_HANDLE
const BUSINESS_NAME = import.meta.env.VITE_BUSINESS_NAME

export const generateOrderMessage = (items, customerInfo) => {
  const itemsList = items.map(item => 
    `• ${item.name} - ₹${item.price} (Qty: ${item.quantity})`
  ).join('\n')
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  return `Hello! I'm interested in ordering from ${BUSINESS_NAME}:

*Order Details:*
${itemsList}

*Total Amount:* ₹${total}

*Customer Information:*
Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
Email: ${customerInfo.email}
Address: ${customerInfo.address}

Please confirm availability and delivery details.`
}

export const sendWhatsAppMessage = (items, customerInfo) => {
  const message = generateOrderMessage(items, customerInfo)
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
  window.open(whatsappUrl, '_blank')
}

export const sendInstagramMessage = (items, customerInfo) => {
  const message = generateOrderMessage(items, customerInfo)
  const instagramUrl = `https://instagram.com/${INSTAGRAM_HANDLE}`
  
  // Copy message to clipboard for Instagram
  navigator.clipboard.writeText(message).then(() => {
    alert('Order details copied to clipboard! Please paste it in your Instagram message.')
    window.open(instagramUrl, '_blank')
  }).catch(() => {
    // Fallback if clipboard API fails
    const textArea = document.createElement('textarea')
    textArea.value = message
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('Order details copied to clipboard! Please paste it in your Instagram message.')
    window.open(instagramUrl, '_blank')
  })
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(price)
}