// // const data = "http://10.100.17.125:8600/acl/api/v1/menu/";

// // export default data;

// const data = [
//     {
//       id: 1,
//       parent: 0,
//       name: "Admin",
//       url:"/policylist"
//     },
//     {
//       id: 2,
//       parent: 1,
//       name: "Create",
//       url:"/policylist"
//     },
//     {
//       id: 3,
//       parent: 1,
//       name: "Delete",
//       url:"/"
//     },
//     {
//       id: 4,
//       parent: 0,
//       name: "Sender",
//       url:"/"
//     },
//     {
//       id: 5,
//       parent: 4,
//       name: "Receiver",
//       url:"/"
//     },
//     {
//       id: 6,
//       parent: 5,
//       name: "Reviewer",
//       url:"/"
//     },
//     {
//       id: 7,
//       parent: 6,
//       name: "Approver",
//       url:"/"
//     },
//     {
//       id: 8,
//       parent: 7,
//       name: "Approved",
//       url:"/"
//     },
//     {
//       id: 9,
//       parent: 8,
//       name: "Report",
//       url:"/"
//     },
//     {
//       id: 10,
//       parent: 5,
//       name: "Editor",
//       url:"/"
//     },
//     {
//       id: 11,
//       parent: 0,
//       name: "Random",
//       url:"/"
//     },
//   ];
  
//   export default data;

// const data = "http://10.100.17.125:8600/acl/api/v1/menu/";

// export default data;

const data = [
    {
      id: 1,
      parent: 0,
      name: "Sender",
      url:"/",
      children:[
        {
          id: 2,
          parent: 1,
          name: "Editor",
          url:"/",
          children:[
            {
              id: 3,
              parent: 2,
              name: "Sender",
              url:"/",
              children:[
                {
                  id: 4,
                  parent: 3,
                  name: "Reviewer",
                  url:"/",
                }
              ]
            },
          ]
        },
        {
          id: 5,
          parent: 1,
          name: "Reviewer",
          url:"/",
          children:[
            {
              id: 6,
              parent: 5,
              name: "Editor",
              url:"/",
            },
            {
              id: 7,
              parent: 5,
              name: "Reviewer",
              url:"/",
              children:[
                {
                  id: 8,
                  parent: 7,
                  name: "Receiver",
                  url:"/",
                  children:[
                    {
                      id: 9,
                      parent: 8,
                      name: "Approver",
                      url:"/",
                      children:[
                        {
                          id: 10,
                          parent: 9,
                          name: "Approved1",
                          url:"/",
                          children:[
                            {
                              id: 12,
                              parent: 10,
                              name: "Approved2",
                              url:"/",
                              children:[
                                {
                                  id: 13,
                                  parent: 12,
                                  name: "Approved3",
                                  url:"/",
                                  children:[
                                    {
                                      id: 14,
                                      parent: 13,
                                      name: "Approved4",
                                      url:"/",
                                      children:[
                                        {
                                          id: 15,
                                          parent: 14,
                                          name: "Approved5",
                                          url:"/",
                                          children:[
                                            {
                                              id: 16,
                                              parent: 15,
                                              name: "Approved6",
                                              url:"/",
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 11,
      parent: 0,
      name: "Sender",
      url:"/",
      children:[]
    },
    {
        id: 11,
        parent: 0,
        name: "Sender",
        url:"/",
        children:[]
    },
    {
        id: 11,
        parent: 0,
        name: "Sender",
        url:"/",
        children:[]
    },
    {
        id: 11,
        parent: 0,
        name: "Sender",
        url:"/",
        children:[]
    },
    {
        id: 11,
        parent: 0,
        name: "Sender",
        url:"/",
        children:[]
    },
  ];
  
  export default data;