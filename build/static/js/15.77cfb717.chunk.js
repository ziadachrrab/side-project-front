"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[15],{61865:function(e,n,t){t.d(n,{x6:function(){return b},Lk:function(){return v},qh:function(){return y},tf:function(){return A},S8:function(){return X},q3:function(){return ee},cG:function(){return J}});var a=t(72791),s=t(57689),r=a.lazy((function(){return t.e(268).then(t.bind(t,74268))})),c=a.lazy((function(){return t.e(811).then(t.bind(t,20811))})),o=a.lazy((function(){return t.e(557).then(t.bind(t,99557))})),i=a.lazy((function(){return Promise.all([t.e(339),t.e(208),t.e(674)]).then(t.bind(t,79674))})),l=a.lazy((function(){return Promise.all([t.e(339),t.e(208),t.e(674)]).then(t.bind(t,79674))})),m=a.lazy((function(){return t.e(248).then(t.bind(t,31333))})),d=a.lazy((function(){return Promise.all([t.e(339),t.e(292)]).then(t.bind(t,292))})),u=a.lazy((function(){return t.e(484).then(t.bind(t,12179))})),h=a.lazy((function(){return Promise.all([t.e(485),t.e(154)]).then(t.bind(t,44581))})),x=[{path:"/",exact:!0,name:"Home"},{path:"/dashboard",name:"Dashboard",element:r},{path:"/products",name:"Inventory",element:i,exact:!0},{path:"/products/productList",name:"Products",element:i},{path:"/products/productState",name:"Status",element:m},{path:"/brands",name:"Brands",element:l,exact:!0},{path:"/brands/brandList",name:"Brands",element:d},{path:"/brands/addBrand",name:"Add",element:u},{path:"/transactions",name:"Transactions",element:h,exact:!0},{path:"/transactions/sales",name:"Sales",element:h},{path:"/transactions/purchases",name:"Purchases",element:a.lazy((function(){return Promise.all([t.e(485),t.e(581),t.e(247)]).then(t.bind(t,1247))}))},{path:"/theme",name:"Theme",element:c,exact:!0},{path:"/theme/colors",name:"Colors",element:c},{path:"/theme/typography",name:"Typography",element:o},{path:"/widgets",name:"Widgets",element:a.lazy((function(){return Promise.all([t.e(12),t.e(743)]).then(t.bind(t,49743))}))}],f=t(78983),p=t(80184),j=function(){var e=(0,s.TH)().pathname,n=function(e){var n=[];return e.split("/").reduce((function(e,t,a,s){var r="".concat(e,"/").concat(t),c=function(e,n){var t=n.find((function(n){return n.path===e}));return!!t&&t.name}(r,x);return c&&n.push({pathname:r,name:c,active:a+1===s.length}),r})),n}(e);return(0,p.jsxs)(f.fj,{className:"m-0 ms-2",children:[(0,p.jsx)(f.Sd,{href:"/",children:"Home"}),n.map((function(e,n){return(0,p.jsx)(f.Sd,{style:{textDecoration:"none"},children:e.name},n)}))]})},b=a.memo(j),g=function(){return(0,p.jsx)(f.KB,{lg:!0,children:(0,p.jsx)(a.Suspense,{fallback:(0,p.jsx)(f.LQ,{color:"primary"}),children:(0,p.jsxs)(s.Z5,{children:[x.map((function(e,n){return e.element&&(0,p.jsx)(s.AW,{path:e.path,exact:e.exact,name:e.name,element:(0,p.jsx)(e.element,{})},n)})),(0,p.jsx)(s.AW,{path:"/",element:(0,p.jsx)(s.Fg,{to:"dashboard",replace:!0})})]})})})},v=a.memo(g),N=function(){return(0,p.jsx)(f.pG,{children:(0,p.jsxs)("div",{children:[(0,p.jsx)("b",{children:"\xa0 \xa0Ziad ACHRRAB"}),(0,p.jsx)("span",{className:"ms-1",children:"\xa0\xa92023 All rights reserved."})]})})},y=a.memo(N),Z=t(59434),C=t(24846),w=t(50612),z=t(19069),S=t(99161),k=t(25757),L=t(66425),P=function(){var e=(0,s.s0)();return(0,a.useEffect)((function(){localStorage.getItem("loggedIn")||e("/login")}),[e]),(0,p.jsxs)(f.w5,{variant:"nav-item",children:[(0,p.jsx)(f.SQ,{placement:"bottom-end",className:"py-0",caret:!1,children:(0,p.jsx)(f.cU,{src:L,size:"md"})}),(0,p.jsxs)(f.$H,{className:"pt-0",placement:"bottom-end",children:[(0,p.jsx)(f.nR,{className:"bg-light fw-semibold py-2",children:"Account"}),(0,p.jsxs)(f.$f,{children:[(0,p.jsx)(C.Z,{icon:S.E,className:"me-2"}),"HH188206"]}),(0,p.jsx)(f.nR,{className:"bg-light fw-semibold py-0",children:"ADMIN"}),(0,p.jsx)(f.lK,{}),(0,p.jsxs)(f.$f,{onClick:function(){localStorage.removeItem("loggedIn"),e("/login")},href:"#",children:[(0,p.jsx)(C.Z,{icon:k.C,className:"me-2"}),"Log Out"]})]})]})},A=function(){var e=(0,Z.I0)(),n=(0,Z.v9)((function(e){return e.sidebarShow}));return(0,p.jsxs)(f.PO,{position:"sticky",className:"mb-4",children:[(0,p.jsxs)(f.KB,{fluid:!0,children:[(0,p.jsx)(f.X4,{className:"ps-1",onClick:function(){return e({type:"set",sidebarShow:!n})},children:(0,p.jsx)(C.Z,{icon:w.N,size:"lg"})}),(0,p.jsx)(f.g3,{className:"d-none d-md-flex me-auto"}),(0,p.jsxs)(f.g3,{className:"ms-3",children:[(0,p.jsx)(f.U6,{children:(0,p.jsx)(f.AQ,{href:"#",children:(0,p.jsx)(C.Z,{icon:z.m,size:"lg"})})}),(0,p.jsx)(P,{})]})]}),(0,p.jsx)(f.rc,{}),(0,p.jsx)(f.KB,{fluid:!0,children:(0,p.jsx)(b,{})})]})},I=t(1413),B=t(45987),H=t(11087),U=["component","name","badge","icon"],T=["component","name","icon","to"],D=function(e){var n=e.items,t=(0,s.TH)(),r=function(e,n,t){return(0,p.jsxs)(p.Fragment,{children:[n&&n,e&&e,t&&(0,p.jsx)(f.C_,{color:t.color,className:"ms-auto",children:t.text})]})},c=function(e,n){var t=e.component,s=e.name,c=e.badge,o=e.icon,i=(0,B.Z)(e,U),l=t;return(0,a.createElement)(l,(0,I.Z)((0,I.Z)({},i.to&&!i.items&&{component:H.OL}),{},{key:n},i),r(s,o,c))},o=function e(n,a){var s,o=n.component,i=n.name,l=n.icon,m=n.to,d=(0,B.Z)(n,T),u=o;return(0,p.jsx)(u,(0,I.Z)((0,I.Z)({idx:String(a),toggler:r(i,l),visible:t.pathname.startsWith(m)},d),{},{children:null===(s=n.items)||void 0===s?void 0:s.map((function(n,t){return n.items?e(n,t):c(n,t)}))}),a)};return(0,p.jsx)(a.Fragment,{children:n&&n.map((function(e,n){return e.items?o(e,n):c(e,n)}))})},O=t(34358),$=(t(82454),t(31285)),K=t(73755),R=t(33309),W=t(56537),q=t(51010),E=t(58350),F=[{component:f.U6,name:"Dashboard",to:"/dashboard",icon:(0,p.jsx)(C.Z,{icon:$.f,customClassName:"nav-icon"})},{component:f.dw,name:"Brands",to:"/brands",icon:(0,p.jsx)(C.Z,{icon:K.$,customClassName:"nav-icon"}),items:[{component:f.U6,name:"Brands",to:"/brands/brandList",icon:(0,p.jsx)(C.Z,{icon:K.$,customClassName:"nav-icon"}),style:{marginLeft:"25px"}}]},{component:f.dw,name:"Inventory",to:"/products",icon:(0,p.jsx)(C.Z,{icon:R.m,customClassName:"nav-icon"}),items:[{component:f.U6,name:"Products",to:"/products/productList",icon:(0,p.jsx)(C.Z,{icon:W.f,customClassName:"nav-icon"}),style:{marginLeft:"25px"}}]},{component:f.dw,name:"Transactions",to:"/transactions",icon:(0,p.jsx)(C.Z,{icon:q.z,customClassName:"nav-icon"}),items:[{component:f.U6,name:"Purchases",to:"/transactions/purchases",icon:(0,p.jsx)(C.Z,{icon:E.h,customClassName:"nav-icon"}),style:{marginLeft:"25px"}}]}],G=t.p+"static/media/OCP.ca825a6b146f583cefc2.png",Q=t.p+"static/media/OCP_Group.e96defcb06382376e2b6.png",_=function(){var e=(0,Z.I0)(),n=(0,Z.v9)((function(e){return e.sidebarUnfoldable})),t=(0,Z.v9)((function(e){return e.sidebarShow}));return(0,p.jsxs)(f.z3,{position:"fixed",unfoldable:n,visible:t,onVisibleChange:function(n){e({type:"set",sidebarShow:n})},children:[(0,p.jsxs)(f.Dl,{className:"d-none d-md-flex",to:"/",children:[(0,p.jsx)("img",{className:"sidebar-brand-full",src:G,alt:"Logo",height:55,width:140}),(0,p.jsx)("img",{className:"sidebar-brand-narrow",alt:"Logo",src:Q,height:35})]}),(0,p.jsx)(f.Xk,{children:(0,p.jsx)(O.Z,{children:(0,p.jsx)(D,{items:F})})}),(0,p.jsx)(f.iv,{className:"d-none d-lg-flex",onClick:function(){return e({type:"set",sidebarUnfoldable:!n})}})]})},X=a.memo(_),M=["href","name","text"],V=function(e){var n=e.href,t=e.name,a=e.text,s=(0,B.Z)(e,M),r=t?"https://coreui.io/react/docs/components/".concat(t):n;return(0,p.jsx)("div",{className:"float-end",children:(0,p.jsx)(f.h7,(0,I.Z)((0,I.Z)({},s),{},{href:r,rel:"noreferrer noopener",target:"_blank",className:"card-header-action",children:(0,p.jsx)("small",{className:"text-medium-emphasis",children:a||"docs"})}))})},J=a.memo(V),Y=function(e){var n=e.children;return(0,p.jsxs)("div",{className:"example",children:[(0,p.jsx)(f.n2,{variant:"tabs"}),(0,p.jsx)(f.gr,{className:"rounded-bottom",children:(0,p.jsx)(f.IA,{className:"p-3 preview",visible:!0,children:n})})]})},ee=a.memo(Y)},66265:function(e,n,t){t.r(n);t(72791);var a=t(61865),s=t(80184);n.default=function(){return(0,s.jsxs)("div",{children:[(0,s.jsx)(a.S8,{}),(0,s.jsxs)("div",{className:"wrapper d-flex flex-column min-vh-100 bg-light",children:[(0,s.jsx)(a.tf,{}),(0,s.jsx)("div",{className:"body flex-grow-1 px-3",children:(0,s.jsx)(a.Lk,{})}),(0,s.jsx)(a.qh,{})]})]})}},66425:function(e,n,t){e.exports=t.p+"static/media/prf.6a08ef5c9155df52a61f.png"}}]);
//# sourceMappingURL=15.77cfb717.chunk.js.map