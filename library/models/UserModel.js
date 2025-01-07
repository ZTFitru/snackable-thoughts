import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
    },
    email: {
      type: String,
      required: true, 
      unique: true,
    },
    password: {
      type: String,
      required: true, 
    },
    blogData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false } 
);

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

const UserModel = mongoose.models.user || mongoose.model('user', userSchema);

export default UserModel;