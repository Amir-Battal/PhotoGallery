
<h1 align="center">
  <br>
  <a href="https://academy.hsoub.com/learn/javascript-application-development/">
    <img src="https://avatars.githubusercontent.com/u/12829424?s=200&v=4" alt="أكاديمية حسوب" width="200">
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" width="200">
  </a>
  <br>
    <h2 align="center">معرض للصور باستخدام Reac.js و Node.js</h2>
  <br>
</h1>

<h4 align="center">هذا المشروع متعلق بدورة تطوير تطبيقات الويب بلغة JavaScript من <a href="https://academy.hsoub.com/learn/javascript-application-development/" target="_blank">اكاديمية حسوب</a>.</h4>

<h4>الملخص التنفيذي</h4>
<ul>
  <li>المزايا الريئيسة</li>
  <li>طريقة الاستخدام</li>
  <li>بناء التطبيق</li>
  <li>التراخيص</li>
</ul>


## المزايا الرئيسية

* تسجيل الدخول وإنشاء حساب جديد من خلال زر تسجيل الدخول Login في الزاوية اليمنى من الشريط العلوي:
  - تسجيل الدخول في حال كان لديك حساب.
  - إنشاء حساب جديد في حال قمت بالدخول الى التطبيق لاول مرة.
  - تستطيع الدخول كضيف ورؤية كل الصورة التي تم رفعها الى الخادم.
* المعرض من خلال زر Gallery في الزاوية اليسرى من الشريط العلوي:
  - يتم عرض كل الصور المرفوعة على الخادم من كل المستخدمين.
  - كل صورة تملك عنوان ووصف.
  - يمكنك رفع الصورة الخاصة بك من هذه الصفحة من خلال زر الزائد في الزاوية اليمني في الاسفل.
* الاعجاب بالصور بزر like:
  - يمكنك الاعجاب بأي صورة في حال كنت مسجل دخول ويتم عرض عدد الاعجابات على كل صورة.
* عرض الصور الخاصة بك من خلال زر MyPhoto في الزاوية اليسرى من الشريط العلوي:
  - يمكنك عرض كل الصور التي قمت برفعها.
  - يمكنك تعديل عنوان او وصف اي صورة تريد من الصور التي قمت برفعها من خلال زر التعديل.
  - يمكن حذف اي صورة تريد من الصور التي قمت برفعها من خلال زر الحذف.
  - يمكنك رفع الصورة الخاصة بك من هذه الصفحة من خلال زر الزائد في الزاوية اليمني في الاسفل.


## كيفية الاستخدام
لعمل clone و تشغيل هذا التطبيق، انت تحتاج الى [Git](https://git-scm.com) و [Node.js](https://nodejs.org/en/download/) مثبتين على الحاسوب الخاص بك، ومن ثم قم بما يلي باستخدام الطرفية Terminal او CMD:


```bash
# Clone this repository
$ git clone https://github.com/Amir-Battal/PhotoGallery.git

# Fill .env file
PORT=
DB_URL=
JWT_SECRET=


# Go into Client Side
$ cd client

# Install dependencies
$ npm install

# Run Client Side
$ npm start

# Create new terminal and Go into Server Side
$ cd server

# Install dependencies
$ npm install

# Run the app
$ nodemon start
```

## بناء التطبيق

هذا التطبيق تم بناؤه باستخدام التقنيات التالية

- [React.js](https://react.dev/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)



## التراخيص

أكاديمية حسوب  [أكاديمية حسوب](https://academy.hsoub.com/)

---

> Linkedin [Amir Battal](https://www.linkedin.com/in/amir-battal/) &nbsp;&middot;&nbsp;
> GitHub [@Amir-Battal](https://github.com/Amir-Battal) &nbsp;&middot;&nbsp;

