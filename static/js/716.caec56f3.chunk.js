"use strict";(self.webpackChunkgh_issues_frontend=self.webpackChunkgh_issues_frontend||[]).push([[716],{3375:function(n,e,r){r.d(e,{BJ:function(){return p},AH:function(){return l},vh:function(){return c},zo:function(){return d}});var t,o,s,a,i=r(168),u=r(4242),c=(0,u.ZP)(t||(t=(0,i.Z)(["\n  query getRepoIssues(\n    $repositoryOwner: String!\n    $repositoryName: String!\n    $issueState: IssueState!\n    $cursor: String\n    $pageSize: Int = 10\n  ) {\n    repository(name: $repositoryName, owner: $repositoryOwner) {\n      issues(last: $pageSize, states: [$issueState], before: $cursor) {\n        edges {\n          node {\n            id\n            number\n            state\n            title\n            url\n            bodyHTML\n            closed\n            createdAt\n            closedAt\n            author {\n              login\n              avatarUrl\n              url\n            }\n            comments(last: $pageSize) {\n              totalCount\n              edges {\n                node {\n                  bodyHTML\n                  createdAt\n                  author {\n                    login\n                    avatarUrl\n                    url\n                  }\n                }\n              }\n            }\n          }\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n          startCursor\n        }\n      }\n    }\n  }\n"]))),l=(0,u.ZP)(o||(o=(0,i.Z)(["\n  query FindIssueID(\n    $repositoryOwner: String!\n    $repositoryName: String!\n    $issueNumber: Int!\n    $pageSize: Int = 10\n  ) {\n    repository(name: $repositoryName, owner: $repositoryOwner) {\n      issue(number: $issueNumber) {\n        id\n        number\n        state\n        title\n        url\n        bodyHTML\n        closed\n        createdAt\n        closedAt\n        author {\n          login\n          avatarUrl\n          url\n        }\n        comments(first: $pageSize) {\n          totalCount\n          pageInfo {\n            endCursor\n            hasNextPage\n            startCursor\n          }\n          edges {\n            node {\n              bodyHTML\n              createdAt\n              author {\n                login\n                avatarUrl\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"]))),d=(0,u.ZP)(s||(s=(0,i.Z)(["\n  query searchIssue($text: String!, $cursor: String, $pageSize: Int = 10) {\n    search(first: $pageSize, query: $text, type: ISSUE, after: $cursor) {\n      pageInfo {\n        endCursor\n        hasNextPage\n        startCursor\n      }\n      nodes {\n        ... on Issue {\n          id\n          number\n          state\n          title\n          url\n          bodyHTML\n          closed\n          createdAt\n          closedAt\n          author {\n            login\n            avatarUrl\n            url\n          }\n        }\n      }\n    }\n  }\n"]))),p=(0,u.ZP)(a||(a=(0,i.Z)(["\n  query fetchComments(\n    $repositoryOwner: String!\n    $repositoryName: String!\n    $issueNumber: Int!\n    $cursor: String\n    $pageSize: Int = 10\n  ) {\n    repository(name: $repositoryName, owner: $repositoryOwner) {\n      issue(number: $issueNumber) {\n        id\n        comments(first: $pageSize, after: $cursor) {\n          edges {\n            node {\n              id\n              bodyHTML\n              author {\n                login\n              }\n            }\n          }\n          pageInfo {\n            endCursor\n            hasNextPage\n            startCursor\n          }\n        }\n      }\n    }\n  }\n"])))},716:function(n,e,r){r.r(e),r.d(e,{SearchPage:function(){return N}});var t,o,s=r(885),a=r(7205),i=r(2791),u=r(2426),c=r.n(u),l=r(9271),d=r(168),p=r(7691),g=p.ZP.div(t||(t=(0,d.Z)(["\n  margin-top: 15px;\n  border-bottom: 1px solid grey;\n  cursor: pointer;\n  padding: 0px 10px;\n  .title {\n    font-size: 16px;\n  }\n\n  .details {\n    font-size: 14px;\n    color: grey;\n  }\n"]))),m=r(184),h=function(n){var e=n.issue,r=e.title,t=e.state,o=e.createdAt,s=e.author,a=e.comments,i=(a=void 0===a?{}:a).totalCount,u=s||{},d=(0,l.k6)(),p=(0,l.TH)().pathname,h="#".concat(e.number," ","Opened"," ").concat(c()(o).fromNow()," by ").concat(u);return(0,m.jsxs)(g,{onClick:function(){return d.push("".concat(p,"/").concat(e.number))},children:[(0,m.jsx)("div",{className:"title",children:r}),(0,m.jsx)("div",{className:"details",children:h}),(0,m.jsxs)("div",{children:[i||0," comments | ",t," "]})]})},f=r(8658),x=function(n){var e=n.setSearchText,r=n.performSearch;return(0,m.jsx)(f.Z,{style:{width:"100%"},onChange:function(n){e(n.target.value)},onKeyDown:function(n){"Enter"===n.key&&r()},variant:"outlined",placeholder:"Search issue title or body",size:"small"})},y=r(6555),v=r(5310),b=r(8823),S=p.ZP.div(o||(o=(0,d.Z)(["\n  margin: 20px 10px;\n  .header {\n    display: flex;\n    padding: 10px 20px;\n    border: 2px solid #e5e5e5;\n    border-radius: 5px;\n    .search-btn {\n      margin-left: 10px;\n    }\n  }\n  .issues {\n    margin-top: 20px;\n    padding: 10px 0px 20px 0px;\n    border: 2px solid #e5e5e5;\n    border-radius: 5px;\n  }\n  .status-checkboxes {\n    margin-left: 15px;\n  }\n  .no-result {\n    margin-top: 30vh;\n    padding: 10px 0px 20px 0px;\n    text-align: center;\n    font-size: 20px;\n    font-weight: 600;\n    font-color: #grey;\n    min-height: 30vh;\n  }\n  .pagination-container {\n    display: flex;\n    justify-content: center;\n    margin-top: 20px;\n    button {\n      margin: 0px 5px;\n      height: 30px;\n      text-transform: none;\n      &:disabled {\n        background-color: #e5e5e5;\n      }\n    }\n    .page {\n      height: 50px;\n      justify-content: center;\n      margin: 5px;\n    }\n  }\n"]))),Z=r(4871),C=r(1412),N=function(){var n=(0,i.useState)(!0),e=(0,s.Z)(n,2),r=e[0],t=e[1],o=(0,y.Wi)(),u=o.search,c=o.gotoNextPage,l=o.gotoPrevPage,d=o.data,p=o.currentPage,g=o.hasMore,f=o.isLoading,N=o.setSearchText,I=function(){u({isOpen:r})};return(0,m.jsxs)(S,{children:[(0,m.jsxs)("div",{className:"header",children:[(0,m.jsx)(x,{setSearchText:N,performSearch:I}),(0,m.jsx)(Z.Z,{className:"status-checkboxes",children:(0,m.jsx)(C.Z,{control:(0,m.jsx)(b.Z,{checked:r,onClick:function(){return t((function(n){return!n}))}}),label:"Open"})}),(0,m.jsx)(a.Z,{onClick:I,className:"search-btn",variant:"contained",color:"primary",children:"Search"})]}),(0,m.jsx)(v.m9,{if:f,children:(0,m.jsx)(v.gb,{})}),(0,m.jsx)(v.m9,{if:!f,children:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(v.m9,{if:d.length>0,children:(0,m.jsx)("div",{className:"issues",children:null===d||void 0===d?void 0:d.map((function(n,e){return(0,m.jsx)(h,{issue:n},"".concat(n.id,"-").concat(e))}))})}),(0,m.jsx)(v.m9,{if:0===d.length,children:(0,m.jsx)("div",{className:"no-result",children:"No result found"})})]})}),(0,m.jsx)(v.m9,{if:d.length>0,children:(0,m.jsxs)("div",{className:"pagination-container",children:[(0,m.jsx)(a.Z,{variant:"outlined",color:"info",size:"small",disabled:p<=1||f,onClick:function(){return l()},children:"prvious page"}),(0,m.jsx)("p",{className:"page",children:p}),(0,m.jsx)(a.Z,{variant:"outlined",color:"info",size:"small",disabled:!g&&d.length<y.IV||f,onClick:function(){return c(r)},children:"Next page"})]})})]})}},4495:function(n,e,r){r.d(e,{T:function(){return g}});var t=r(2982),o=r(885),s=r(6555),a=r(9271),i=r(9226),u=r(6586),c=r(3375),l=r(2791),d=r(5370),p=r.n(d),g=function(){var n=(0,a.TH)().pathname,e=(0,l.useState)(null),r=(0,o.Z)(e,2),d=r[0],g=r[1],m=(0,l.useState)([]),h=(0,o.Z)(m,2),f=h[0],x=h[1],y=(0,l.useState)(),v=(0,o.Z)(y,2),b=v[0],S=v[1],Z=n.split("/").slice(1),C=(0,o.Z)(Z,4),N=C[0],I=C[1],$=(C[2],C[3]),j=(0,i.a)(c.AH,{variables:{repositoryName:I,repositoryOwner:N,issueNumber:parseInt($),pageSize:s.IV},onCompleted:function(n){g(n.repository.issue);var e=n.repository.issue.comments.edges;e&&x((function(n){return[].concat((0,t.Z)(n),(0,t.Z)(e))}));var r=n.repository.issue.comments.pageInfo.endCursor;S(r)},onError:function(n){p().toast({html:n.message})}}),P=j.loading,k=j.error,z=(0,u.t)(c.BJ,{onCompleted:function(n){var e=n.repository.issue.comments.edges;x((function(n){return[].concat((0,t.Z)(n),(0,t.Z)(e))}));var r=n.repository.issue.comments.pageInfo.endCursor;S(r)},onError:function(n){p().toast({html:n.message})}}),w=(0,o.Z)(z,2),O=w[0],E=w[1].loading,T=(0,l.useCallback)((function(){O({variables:{repositoryName:I,repositoryOwner:N,issueNumber:parseInt($),cursor:b,pageSize:s.IV}})}),[b,O,$,N,I]);return{issue:d,hasMoreComments:!!b&&f.length>=s.IV,comments:f,isLoading:P,isError:!!k,fetchMoreComments:T,loadingComments:E}}},6555:function(n,e,r){var t;r.d(e,{IV:function(){return m.I},Wi:function(){return g}}),function(n){n.OPEN="OPEN",n.CLOSE="CLOSE"}(t||(t={}));var o=r(2982),s=r(885),a=r(6586),i=r(9226),u=r(2791),c=r(3375),l=r(9271),d=r(5370),p=r.n(d),g=function(){var n=(0,u.useState)([]),e=(0,s.Z)(n,2),r=e[0],t=e[1],d=(0,u.useState)([]),g=(0,s.Z)(d,2),h=g[0],f=g[1],x=(0,u.useState)(!1),y=(0,s.Z)(x,2),v=y[0],b=y[1],S=(0,u.useState)(null),Z=(0,s.Z)(S,2),C=Z[0],N=Z[1],I=(0,u.useState)(null),$=(0,s.Z)(I,2),j=$[0],P=$[1],k=(0,u.useState)(0),z=(0,s.Z)(k,2),w=z[0],O=z[1],E=(0,u.useState)(""),T=(0,s.Z)(E,2),A=T[0],H=T[1],L=(0,l.TH)().pathname.split("/").slice(1,3),M=(0,s.Z)(L,2),U=M[0],q=M[1],V=(0,u.useCallback)((function(){O((function(n){return n+1}))}),[]),_=(0,u.useCallback)((function(){O(0)}),[]),B=(0,u.useCallback)((function(){O((function(n){return n-1}))}),[]),D=(0,a.t)(c.zo,{onCompleted:function(n){var e=n.search.nodes;e.length&&V();var r=[].concat((0,o.Z)(h),(0,o.Z)(e));f(r),P(n.search.pageInfo.endCursor)},onError:function(n){p().toast({html:n.message})},fetchPolicy:"network-only"}),F=(0,s.Z)(D,2),J=F[0],W=F[1],K=W.error,R=W.loading,G=(0,i.a)(c.vh,{variables:{repositoryOwner:U,repositoryName:q,pageSize:m.I,issueState:"OPEN"},fetchPolicy:"cache-first",onCompleted:function(n){var e=n.repository.issues.edges.map((function(n){return n.node}));e.reverse(),e.length&&V(),t((function(n){return[].concat((0,o.Z)(n),(0,o.Z)(e))})),N(n.repository.issues.pageInfo.startCursor)},onError:function(n){p().toast({html:n.message})}}),Q=G.error,X=G.loading,Y=G.refetch,nn=(0,u.useCallback)((function(n){var e=n.isOpen,r=n.isNextPage;if(b(!!A),A){var t="repo:".concat(U,"/").concat(q," type:issue ").concat(A," state:").concat(e?"open":"closed");r||(_(),P(null),f([])),J({variables:{text:t,pageSize:m.I,cursor:r&&j}})}}),[U,q,_,J,j,A]),en=(0,u.useCallback)((function(n){nn({isNextPage:!0,isOpen:n})}),[nn]),rn=(0,u.useCallback)((function(n){v&&R||X&&!v||(A?h.length>w*m.I?V():en(n):r.length>w*m.I?V():Y({cursor:C}))}),[w,en,V,v,X,C,Y,r.length,h.length,A,R]);(0,u.useEffect)((function(){!A&&b(!1)}),[A]);var tn=!(!K&&!Q),on=X||R,sn=((w||1)-1)*m.I,an=sn+m.I;return{search:nn,data:(v?h:r).slice(sn,an),currentPage:w,hasMore:A?!!j:!!C,isError:tn,isLoading:on,gotoNextPage:rn,gotoPrevPage:B,setSearchText:H}},m=(r(4495),r(6591))}}]);
//# sourceMappingURL=716.caec56f3.chunk.js.map