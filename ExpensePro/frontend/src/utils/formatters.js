/**
 * Format currency
 */

export function formatCurrency(amount) {

    return new Intl.NumberFormat("en-IN", {

        style: "currency",

        currency: "INR",

        maximumFractionDigits: 2

    }).format(amount);

}


/**
 * Format date
 */

export function formatDate(date) {

    return new Date(date).toLocaleDateString(

        "en-IN",

        {

            day: "2-digit",

            month: "short",

            year: "numeric"

        }

    );

}


/**
 * Format percentage
 */

export function formatPercentage(value) {

    return `${Number(value).toFixed(1)}%`;

}