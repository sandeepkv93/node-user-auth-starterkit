const Genders = Object.freeze({
    Male: 'male',
    Female: 'female',
    Other: 'other',
});

const Roles = Object.freeze({
    Patient: 'Patient',
    Doctor: 'doctor',
    Guardian: 'guardian',
    Receptionist: 'receptionist',
    HospitalAdmin: 'hospitaladmin',
    SuperAdmin: 'superadmin'
});

module.exports = {
    Genders: Genders,
    Roles: Roles
};