const Member = require("../models/membersmodels");

const getAllMembers = () => {
  return new Promise((resolve, reject) => {
    Member.find({}, (err, members) => {
      if (err) {
        reject(err);
      } else {
        resolve(members);
      }
    });
  });
};

const getMemberById = (id) => {
  return new Promise((resolve, reject) => {
    Member.findById(id, (err, member) => {
      if (err) {
        reject(err);
      } else {
        resolve(member);
      }
    });
  });
};

const addMember = (newMember) => {
  return new Promise((resolve, reject) => {
    const member = new Member(newMember);

    member.save((err) => {
      if (err) {
        reject(err);
      } else {
        Member.find([], (err, members) => {
          if (err) {
            reject(err);
          } else {
            resolve(members);
          }
        });
      }
    });
  });
};

const updateMember = (id, memberToUpdate) => {
  return new Promise((resolve, reject) => {
    Member.findByIdAndUpdate(id, memberToUpdate, (err) => {
      if (err) {
        reject(err);
      } else
        Member.find([], (err, members) => {
          if (err) {
            reject(err);
          } else {
            Member.find([], (err, members) => {
              if (err) {
                reject(err);
              } else {
                resolve(members);
              }
            });
          }
        });
    });
  });
};

// Delete an existing car
const deleteMember = (id) => {
  return new Promise((resolve, reject) => {
    Member.findByIdAndDelete(id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted successfully");
      }
    });
  });
};

module.exports = {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
};
