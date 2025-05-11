import React, { useState, useEffect } from 'react';
import { Button, Grid, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Autocomplete, TextField, Typography } from '@mui/material';
import { Phone } from '@mui/icons-material';
import FormTextField from './FormTextField';
import { validatePhoneNumber, validateEmail, validateURL, validatePassword } from '../utils/validationUtils';
import { getNames } from 'country-list';

/**
 * StudentForm component for student signup.
 */
const countries = getNames();
const universities = ['Harvard', 'MIT', 'Stanford', 'Oxford', 'Cambridge'];
const coursesByUniversity = {
  Harvard: ['Computer Science', 'Physics', 'Biology'],
  MIT: ['Engineering', 'Mathematics', 'Robotics'],
  Stanford: ['Business', 'Psychology', 'Computer Science'],
  Oxford: ['History', 'Literature', 'Philosophy'],
  Cambridge: ['Economics', 'Chemistry', 'Medicine'],
};
const interests = ['AI', 'Machine Learning', 'Data Science', 'Web Development'];
const accommodations = ['1BHK', '2BHK', 'Studio', 'Shared Room'];

const StudentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    profileType: 'student',
    firstName: '',
    lastName: '',
    countryOfOrigin: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    universityName: '',
    universityId: '',
    courseName: '',
    graduationYear: '',
    bio: '',
    interests: [],
    accommodationPreferences: [],
    profilePictureURL: '',
    socialMediaLinks: { linkedin: '', twitter: '' },
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [availableCourses, setAvailableCourses] = useState([]);
  const [graduationYears, setGraduationYears] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setGraduationYears(Array.from({ length: 11 }, (_, i) => currentYear + i));
  }, []);

  useEffect(() => {
    setAvailableCourses(coursesByUniversity[formData.universityName] || []);
    setFormData((prev) => ({ ...prev, courseName: '' }));
  }, [formData.universityName]);

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = 'First name is required';
    if (!formData.lastName) tempErrors.lastName = 'Last name is required';
    if (!formData.countryOfOrigin) tempErrors.countryOfOrigin = 'Country is required';
    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) tempErrors.phoneNumber = 'Invalid phone';
    if (!formData.email || !validateEmail(formData.email)) tempErrors.email = 'Valid email is required';
    if (!formData.password || !validatePassword(formData.password)) tempErrors.password = 'Password must be 8+ chars with letters/numbers';
    if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = 'Passwords must match';
    if (!formData.universityName) tempErrors.universityName = 'University is required';
    if (!formData.universityId) tempErrors.universityId = 'University ID is required';
    if (!formData.courseName) tempErrors.courseName = 'Course is required';
    if (!formData.graduationYear) tempErrors.graduationYear = 'Graduation year is required';
    if (formData.profilePictureURL && !validateURL(formData.profilePictureURL)) tempErrors.profilePictureURL = 'Invalid URL';
    if (formData.socialMediaLinks.linkedin && !validateURL(formData.socialMediaLinks.linkedin)) tempErrors.linkedin = 'Invalid LinkedIn URL';
    if (formData.socialMediaLinks.twitter && !validateURL(formData.socialMediaLinks.twitter)) tempErrors.twitter = 'Invalid Twitter URL';
    if (!formData.termsAccepted) tempErrors.termsAccepted = 'Accept terms';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('socialMediaLinks')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        socialMediaLinks: { ...prev.socialMediaLinks, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}><FormTextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required error={errors.firstName} helperText={errors.firstName} /></Grid>
        <Grid item xs={6}><FormTextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required error={errors.lastName} helperText={errors.lastName} /></Grid>
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.countryOfOrigin}>
            <InputLabel>Country</InputLabel>
            <Select name="countryOfOrigin" value={formData.countryOfOrigin} onChange={handleChange} required>
              <MenuItem value=""><em>Select</em></MenuItem>
              {countries.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
            {errors.countryOfOrigin && <Typography color="error">{errors.countryOfOrigin}</Typography>}
          </FormControl>
        </Grid>
        <Grid item xs={12}><FormTextField label="Phone (Optional)" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} error={errors.phoneNumber} helperText={errors.phoneNumber || '+1234567890'} adornment={<Phone />} /></Grid>
        <Grid item xs={12}><FormTextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required error={errors.email} helperText={errors.email} /></Grid>
        <Grid item xs={12}><FormTextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required error={errors.password} helperText={errors.password} /></Grid>
        <Grid item xs={12}><FormTextField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required error={errors.confirmPassword} helperText={errors.confirmPassword} /></Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={universities}
            value={formData.universityName || null}
            onChange={(e, value) => setFormData({ ...formData, universityName: value || '' })}
            renderInput={(params) => <TextField {...params} label="University" required error={!!errors.universityName} helperText={errors.universityName} />}
          />
        </Grid>
        <Grid item xs={12}><FormTextField label="University ID" name="universityId" value={formData.universityId} onChange={handleChange} required error={errors.universityId} helperText={errors.universityId} /></Grid>
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.courseName}>
            <InputLabel>Course</InputLabel>
            <Select name="courseName" value={formData.courseName} onChange={handleChange} required>
              {availableCourses.length > 0 ? (
                availableCourses.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)
              ) : (
                <MenuItem value="">No courses available</MenuItem>
              )}
            </Select>
            {errors.courseName && <Typography color="error">{errors.courseName}</Typography>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.graduationYear}>
            <InputLabel>Graduation Year</InputLabel>
            <Select name="graduationYear" value={formData.graduationYear} onChange={handleChange} required>
              {graduationYears.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
            </Select>
            {errors.graduationYear && <Typography color="error">{errors.graduationYear}</Typography>}
          </FormControl>
        </Grid>
        <Grid item xs={12}><FormTextField label="Bio (Optional)" name="bio" multiline rows={3} value={formData.bio} onChange={handleChange} /></Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={interests}
            value={formData.interests}
            onChange={(e, value) => setFormData({ ...formData, interests: value })}
            renderInput={(params) => <TextField {...params} label="Interests (Optional)" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={accommodations}
            value={formData.accommodationPreferences}
            onChange={(e, value) => setFormData({ ...formData, accommodationPreferences: value })}
            renderInput={(params) => <TextField {...params} label="Accommodation Preferences (Optional)" />}
          />
        </Grid>
        <Grid item xs={12}><FormTextField label="Profile Picture URL (Optional)" name="profilePictureURL" value={formData.profilePictureURL} onChange={handleChange} error={errors.profilePictureURL} helperText={errors.profilePictureURL || 'e.g., https://example.com/image.jpg'} /></Grid>
        <Grid item xs={12}><FormTextField label="LinkedIn (Optional)" name="socialMediaLinks.linkedin" value={formData.socialMediaLinks.linkedin} onChange={handleChange} error={errors.linkedin} helperText={errors.linkedin} /></Grid>
        <Grid item xs={12}><FormTextField label="Twitter (Optional)" name="socialMediaLinks.twitter" value={formData.socialMediaLinks.twitter} onChange={handleChange} error={errors.twitter} helperText={errors.twitter} /></Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />}
            label="I accept the terms"
          />
          {errors.termsAccepted && <Typography color="error">{errors.termsAccepted}</Typography>}
        </Grid>
        <Grid item xs={12}><Button type="submit" variant="contained" fullWidth>Sign Up</Button></Grid>
      </Grid>
    </form>
  );
};

export default StudentForm;