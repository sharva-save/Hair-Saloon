import {FocusCard} from '../components/ui/focus-card'

export default function FocusCards() {
  const cards = [
    {
      title: "Fresh cut, fresh confidence.",
      src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Precision fades that define your style.",
      src: "https://images.unsplash.com/photo-1635273051839-003bf06a8751?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhcmJlciUyMHNob3B8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Every detail matters – sharp lines, sharper look.",
      src: "https://images.unsplash.com/photo-1647140655214-e4a2d914971f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJhcmJlciUyMHNob3B8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Beard grooming that speaks elegance",
      src: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJhcmJlciUyMHNob3B8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Mastering the blend – where art meets barbering.",
      src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhhaXIlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "That moment when the mirror says it all.",
      src: "https://images.unsplash.com/photo-1654097800183-574ba7368f74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhhaXIlMjBtYW58ZW58MHx8MHx8fDA%3D",
    },
  ];

  return <FocusCard cards={cards} />;
}
