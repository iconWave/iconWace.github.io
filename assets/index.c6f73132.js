import{d as e}from"./index.890abe3b.js";import{h as n,x as s,E as l,I as a,u,v as t,A as r,z as o,F as i,G as d,H as m}from"./antdv.03c9fae7.js";import{_ as c}from"./_plugin-vue_export-helper.cdc0426e.js";const p=e({id:"user",state:()=>({name:"张三"}),actions:{updateName(e){this.name=e}}}),v=n({__name:"UserPinia",setup(e){const n=p();return n.updateName("李四"),(e,t)=>(s(),l("div",null,a(u(n).name),1))}}),b=n({name:"Index",components:{UserPinia:v}}),f=d("img",{alt:"Vue logo",src:"/assets/vue.5532db34.svg"},null,-1),_=d("br",null,null,-1),g=d("br",null,null,-1),x=m("点击跳转至login"),h=d("br",null,null,-1),j=m("点击跳转至vueUse页面"),U=d("br",null,null,-1),I=d("br",null,null,-1),N=d("div",{class:"root"},"我来了，我看到了，我征服了。",-1);const P=c(b,[["render",function(e,n,a,u,d,m){const c=v,p=t("router-link");return s(),l(i,null,[f,_,r(c),g,r(p,{to:"/login"},{default:o((()=>[x])),_:1}),h,r(p,{to:"/vueuse"},{default:o((()=>[j])),_:1}),U,I,N],64)}]]);export{P as default};
