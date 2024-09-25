function balanced_point(arr, n) {
    sum = 0; 
    left_sum = 0; 

    for (let i = 0; i < n; ++i)
        sum += arr[i];

    for (let i = 0; i < n; ++i) {
        sum -= arr[i]; 

        if (left_sum == sum)
            return i;

        left_sum += arr[i];
    }
    return -1;
}
arr = new Array(2, 2, 2, 2, 2, 2);
n = arr.length;
console.log("First balance point index is " + balanced_point(arr, n));