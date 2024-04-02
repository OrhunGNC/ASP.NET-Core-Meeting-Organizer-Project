
internal class Program
{
    private static void Main(string[] args)
    {
        /*

        Problem:
        t and z are strings consist of lowercase English letters.

        Find all substrings for t, and return the maximum value of [ len(substring) x [how many times the substring occurs in z] ]

        Example:
        t = acldm1labcdhsnd
        z = shabcdacasklksjabcdfueuabcdfhsndsabcdmdabcdfa

        Solution:
        abcd is a substring of t, and it occurs 5 times in Z, abcd.Length x 5 = 20 is the solution

        */
        int FindOccurance(string substring, string mainString)
        {
            int max = 0;
            for (int i = 0; i < substring.Length; i++)
            {
                for (int j = i + 1; j <= substring.Length; j++)
                {
                    string newsubstring = substring.Substring(i, j - i);
                    int count = 0;
                    int index = mainString.IndexOf(newsubstring);
                    while (index != -1)
                    {
                        count++;
                        index = mainString.IndexOf(newsubstring, index + 1);
                    }
                    int result = newsubstring.Length * count;
                    if (result > max)
                    {
                        max = result;
                    }
                }
            }
            return max;
        }

        var t = "acldm1labcdhsnd";
        var z = "shabcdacasklksjabcdfueuabcdfhsndsabcdmdabcdfa";

        Console.WriteLine(FindOccurance(t, z));

    }
}
