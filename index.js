import {
    PrismaClient
}

from


"@prisma/client";

const prisma = new PrismaClient();

// async function createUser(mail, name, lastname) {
//   return await prisma.user.create({
//     data: {
//       mail,
//       name,
//       lastname
//     }
//   });
// }

// createUser('maria@example.com', 'maria', 'Doe')
//   .then(user => console.log('Usuario creado:', user))
//   .finally(() => prisma.$disconnect());






async function getAllUsers() {
    const users = await prisma.user.findMany({
        include: {
            posts:  true
        }
    });

    users.forEach(user => {

        console.log('--------------');
        console.log(`User: ${user.name}`);
        console.log(`User mail: ${user.mail}`);
        

        user.posts.forEach((post,i) => {
            console.log(`${i}. ${post.title} - ${post.content}`);
        })
    })
}

// getAllUsers()
// .then(users => console.log('Usuarios:', users)) // depende si hay return o no
// .finally(() => prisma.$disconnect());




// async function getUserById(userId) {
//     return await prisma.user.findUnique({
//       where: {
//         id: userId
//       }
//     });
//   }
  
//   getUserById(1)
//     .then(user => console.log('Usuario:', user))
//     .finally(() => prisma.$disconnect());




// async function deleteUserById(userId) {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: userId
//     }
//   });

//   if (!user) {
//     throw new Error(`No se encontró el usuario con el ID ${userId}`);
//   }

//   return await prisma.user.delete({
//     where: {
//       id: userId
//     }
//   });
// }

// deleteUserById(3)
//   .then(deletedUser => console.log('Usuario eliminado:', deletedUser))
//   .catch(error => console.error(error.message))
//   .finally(() => prisma.$disconnect());




// async function updateUser(userId, newData) {
//     const user = await prisma.user.findUnique({
//       where: {
//         id: userId
//       }
//     });
  
//     if (!user) {
//       throw new Error(`No se encontró el usuario.`);
//     }
  
//     return await prisma.user.update({
//       where: {
//         id: userId
//       },
//       data: newData
//     });
//   }
  
//   // Ejemplo de uso
//   const newData = {
//     name: 'Nuevo Nombre',
//     lastname: 'Nuevo Apellido'
//   };
  
//   updateUser(2, newData)
//     .then(updatedUser => console.log('Usuario actualizado:', updatedUser))
//     .catch(error => console.error(error.message))
//     .finally(() => prisma.$disconnect());




// async function upsertUser(data) {
//     return await prisma.user.upsert({
//       where: {
//         mail: data.mail
//       },
//       update: {
//         name: data.name,
//         lastname: data.lastname
//       },
//       create: {
//         mail: data.mail,
//       }
//     });
//   }
  
//   // Ejemplo de uso
//   const userData = {
//     mail: 'old@example.com',
//     name: 'John',
//     lastname: 'Doe'
//   };
  
//   upsertUser(userData)
//     .then(upsertedUser => console.log('Usuario creado o actualizado:', upsertedUser))
//     .catch(error => console.error(error.message))
//     .finally(() => prisma.$disconnect());


async function createPost(title, content, authorId) {
    return await prisma.post.create({
      data: {
        title,
        content,
        authorId
      }
    });
  }
  
//   createPost('segundo Post', 'este es el contenido del Post', 4)
//     .then(post => console.log('Post creado:', post))
//     .catch(error => console.error(error.message))
//     .finally(() => prisma.$disconnect());




async function createUserWithPost(name, mail, postTitle, postContent) {
    return await prisma.user.create({
      data: {
        name,
        mail,
        posts: {
          create: {
            title: postTitle,
            content: postContent
          }
        }
      },
      include: {
        posts: true
      }
    });
  }
  
  createUserWithPost(
    'John Cameron2',
    'john.cameron2@example.com',
    'Mi primer post 2',
    'aqui el comentario del post 2'
  )
    .then(user => console.log('Usuario y Post creados:', user))
    .catch(error => console.error(error.message))
    .finally(() => prisma.$disconnect());


async function getAllPosts() {
return await prisma.post.findMany();
}

// getAllPosts()
// .then(posts => console.log('Posts:', posts))
// .finally(() => prisma.$disconnect());