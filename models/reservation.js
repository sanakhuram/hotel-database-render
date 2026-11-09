module.exports = (sequelize, Sequelize) => {
    const Reservation = sequelize.define('Reservation', {
        //start date validation
        StartDate: {
        type:  Sequelize.DataTypes.DATE,
        validate: {
            bothDatesProvided(value){
                if (value && !this.EndDate){
                    throw new Error("End date must be provided")
                }
            }

            }
        },
// End date validation
        EndDate: {
            type: Sequelize.DataTypes.DATE,
            validate: {
                bothDatesProvided(value) {
                    if (value && !this.StartDate) {
                        throw new Error("Start date must be provided");
                    }

                    },
                    
        endDateAfterStartDate(value) {
        if (value && this.StartDate) {
            const startDate = new Date(this.StartDate);
            const endDate = new Date(value);

            const oneDay = 24 * 60 * 60 * 1000;

            if (endDate - startDate < oneDay) {
                throw new Error (
                    "End date must be at least 1 day after start date"
                );
            }
        }
    }
                }
            },

    },

    {
        timestamps: false,
        hasTrigger: true
    });
	return Reservation
}