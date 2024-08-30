# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
- tailwind , sass
- npm i react-router-dom
- npm i react-hook-form
- npm i react-toastify : notification
- npm i styled-components
- npm i uuid : id unit
- npm i yup : validation
- npm i prop-types : check type
- npm i node-sass
- npm i axios

-FIREBASE:

. go Rules => allow read, write: if request.auth != null; bắt buộc đăng nhập mới thêm vào db được

- Routes

- auth context : để lưu trữ thông tin user

--------------- SignUp Page --------------------------

- viet signup (ui) => useForm lay ra values => loading => validation => authentication => propstype

-- End day 1

--------------- SignIn Page --------------------

- viet signin_page : react hook form + yup login ui

-- End day 2

---------------- Home Page -------------------

- header ui

- viet banner

- detail ui

- Routing

- responsive

-- End day 3

- Dashboard : Dashboard Page : Dashboard Header , Dashboard Layout, sidebar
  ---- Post Manage: Table , search , Paginate
  => import react-paginate : npm i react-paginate

--- End day 4

- Add new post => id , title, slug, image , createAt, status, content, userId, categoryId

- Upload file img to storage => https://firebase.google.com/docs/storage/web/upload-files?hl=en&authuser=0

- delete file img in storage => https://firebase.google.com/docs/storage/web/delete-files?hl=en&authuser=0

Lưu ý về authen and db: signup => User UID => User UID = Id (document) của Collection users => UID = Id = userId (userId là field của collection post)
