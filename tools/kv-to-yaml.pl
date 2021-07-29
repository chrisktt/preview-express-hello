#!/usr/bin/env perl
# Convert key-value pairs to yaml
#    KEY=VALUE
# becomes
#    - key: "KEY"
#    value: "VALUE"

sub  trim { my $s = shift; $s =~ s/^\s+|\s+$//g; return $s };

while (<>) {
    chomp;
    m/^#/ and next;  # skip comments
    m/=/ or next;  # skip if no equal sign
    ($key,$val) = split('=', $_, 2);
    print "- key: ",   trim($key), "\n";
    print "  value: ", trim($val), "\n";
}

