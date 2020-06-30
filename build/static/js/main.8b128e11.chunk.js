(this.webpackJsonpthegreatlinkerator=this.webpackJsonpthegreatlinkerator||[]).push([[0],{38:function(e,t,a){e.exports=a(68)},62:function(e,t,a){},66:function(e,t,a){},67:function(e,t,a){},68:function(e,t,a){"use strict";a.r(t);var n=a(37),r=a(9),l=a(0),c=a.n(l),o=a(13),u=a.n(o),i=a(21),m=a.n(i),s=(a(60),a(14)),p=a(6),E=(a(24),a(35),a(62),function(e){var t=e.links,a=(e.SearchBar,e.setShow),n=Object(l.useState)(),o=Object(r.a)(n,2),u=(o[0],o[1]);Object(l.useEffect)((function(){}));return c.a.createElement("header",null,c.a.createElement("h1",null,'Welcome to "The Great Linkerator"'),c.a.createElement(p.a,null,c.a.createElement(p.a.Group,{controlId:"exampleForm.SelectCustom"},c.a.createElement(p.a.Label,null,"Sort Links: "),c.a.createElement(p.a.Control,{as:"select",custom:!0},c.a.createElement("option",null,"[select]"),c.a.createElement("option",{onChange:function(){var e=t.sort((function(e,t){return e.count>t.count?1:-1})).reverse();u(e)},key:"popular"},"Most Popular"),c.a.createElement("option",{onChange:function(){var e=t.sort((function(e,t){return e.count>t.count?1:-1}));u(e)},key:"unpopular",value:"unpopular"},"Least Popular")))),c.a.createElement("form",null,c.a.createElement(s.a,{variant:"primary",onClick:function(){return a(!0)}},"Create Link")))}),d=a(25),f=a(16),h=(a(66),function(e){var t=e.name,a=e.id,n=e.url,r=e.comment,l=e.tags,o=e.date,u=e.count,i=e.updateClickCount;return o=new Date(o),c.a.createElement(d.a,{style:{width:"50rem",margin:"5px 0"}},c.a.createElement(d.a.Header,{className:"link-header"},t),c.a.createElement(f.a,{variant:"flush"},c.a.createElement(f.a.Item,{className:"link-list-item"}," ",c.a.createElement("a",{href:"https://".concat(n),target:"_blank",rel:"noopener noreferrer",onClick:function(){return i(a,u)}},n)),c.a.createElement(f.a.Item,{className:"link-list-item"},r),c.a.createElement(f.a.Item,{className:"link-list-item"},"Tags: ",l?l.map((function(e){return e.name})).join(", "):""),c.a.createElement(f.a.Item,{className:"link-list-item"},"Link has been clicked ",u," time(s) since ","".concat(o.getMonth()+1,"/").concat(o.getDate(),"/").concat(o.getFullYear()),c.a.createElement(s.a,{className:"update-button",variant:"primary"},"Update"))))}),k=a(15),g=(a(67),function(e){var t=e.show,a=e.setShow,n=e.createLink,o=Object(l.useState)(""),u=Object(r.a)(o,2),i=u[0],m=u[1],E=Object(l.useState)(""),d=Object(r.a)(E,2),f=d[0],h=d[1],g=Object(l.useState)(""),b=Object(r.a)(g,2),C=b[0],v=b[1],S=Object(l.useState)(""),j=Object(r.a)(S,2),O=j[0],L=j[1],y=function(){return a(!1)};return c.a.createElement(c.a.Fragment,null,c.a.createElement(k.a,{show:t,onHide:y},c.a.createElement(k.a.Header,{className:"modal-header",closeButton:!0},c.a.createElement(k.a.Title,null,"Create a New Link")),c.a.createElement(k.a.Body,null,c.a.createElement(p.a.Group,{controlId:"exampleForm.ControlInput1"},c.a.createElement(p.a.Label,null,"Site Name:"),c.a.createElement(p.a.Control,{type:"text",placeholder:"Site Name",onChange:function(e){return m(e.target.value)},value:i})),c.a.createElement(p.a.Group,{controlId:"exampleForm.ControlInput2"},c.a.createElement(p.a.Label,null,"Site URL:"),c.a.createElement(p.a.Control,{type:"text",placeholder:"Site URL",onChange:function(e){return h(e.target.value)},value:f})),c.a.createElement(p.a.Group,{controlId:"exampleForm.ControlInput3"},c.a.createElement(p.a.Label,null,"Comment:"),c.a.createElement(p.a.Control,{type:"text",placeholder:"Site Comment",onChange:function(e){return v(e.target.value)},value:C})),c.a.createElement(p.a.Group,{controlId:"exampleForm.ControlInput4"},c.a.createElement(p.a.Label,null,"Tags:"),c.a.createElement(p.a.Control,{type:"text",placeholder:"tags...",onChange:function(e){return L(e.target.value)},value:O}))),c.a.createElement(k.a.Footer,null,c.a.createElement(s.a,{variant:"secondary",onClick:y},"Close"),c.a.createElement(s.a,{variant:"primary",onClick:function(){n({name:i,url:f,comment:C,tags:O}),y()}},"Create Link"))))}),b=function(){var e=Object(l.useState)([]),t=Object(r.a)(e,2),a=t[0],o=t[1],u=Object(l.useState)(!1),i=Object(r.a)(u,2),s=i[0],p=i[1],d=Object(l.useState)([]),f=Object(r.a)(d,2);f[0],f[1];Object(l.useEffect)((function(){m.a.get("/api/links").then((function(e){o(e.data.links),console.log("Set Links!!!",e.data.links)})).catch((function(e){console.error("Failed to fetch links.",e)}))}),[]);var k=function(e,t){m.a.patch("/api/links/".concat(e),{count:t+1}).then((function(t){console.log("<<<updateClick>>>",e),o(a.map((function(e){return e.id===t.data.link.id?t.data.link:e})))})).catch((function(e){console.error("Failed to update count",e)}))};return c.a.createElement(c.a.Fragment,null,c.a.createElement(E,{setShow:p}),a.map((function(e){return c.a.createElement(h,Object.assign({key:e.id},e,{updateClickCount:k}))})),c.a.createElement(g,{show:s,setShow:p,createLink:function(e){var t=e.name,r=e.url,l=e.comment,c=e.tags,u=e.count,i=e.date;console.log("createLink being called!!!!"),m.a.post("/api/links",{name:t,url:r,comment:l,tags:c,count:u,date:i}).then((function(e){console.log("NEW LINK!!!",e.data),o([].concat(Object(n.a)(a),[e.data.link]))})).catch((function(e){console.error("Failed to create new link!",e)}))}}))},C=document.querySelector("#app");u.a.render(c.a.createElement(b,null),C)}},[[38,1,2]]]);
//# sourceMappingURL=main.8b128e11.chunk.js.map