const axios = require('axios');

async function testPostUniversityRequest() {
try {
const response = await axios.post('http://localhost:3000/university', {
name: 'Sofia University',
town: 'Sofia'
});
console.log('Response data:', response.data);
} catch (error) {
console.error('Error:', error.response ? error.response.data : error.message);
}
}

async function testPostSubjectRequest() {
try {
const response = await axios.post('http://localhost:3000/subject', {
name: 'Math',
});
console.log('Response data:', response.data);
} catch (error) {
console.error('Error:', error.response ? error.response.data : error.message);
}
}

async function testPostSubjectRequest2() {
try {
const response = await axios.post('http://localhost:3000/subject', {
name: 'IT',
});
console.log('Response data:', response.data);
} catch (error) {
console.error('Error:', error.response ? error.response.data : error.message);
}
}


async function testPostUserRequest() {
try {
const response = await axios.post('http://localhost:3000/user', {
name: 'John Doe',
email: 'johndoe@example.com',
universityId: 1,
subjectId: 1
});
console.log('Response data:', response.data);
} catch (error) {
console.error('Error:', error.response ? error.response.data : error.message);
}
}

async function testPutUserSubjectRequest() {
try {
const userId = 1;
const subjectId = 2;

const response = await axios.put(`http://localhost:3000/user/${userId}/subject`, {
subjectId: subjectId
});

console.log('Response data:', response.data);
} catch (error) {
console.error('Error:', error.response ? error.response.data : error.message);
}
}

(async () => {
await testPostUniversityRequest();
await testPostSubjectRequest();
await testPostSubjectRequest2();
await testPostUserRequest();
await testPutUserSubjectRequest();
})()