#!/usr/bin/env perl

=pod
Convert key-value pairs to YAML.

For example:
   KEY=VALUE
becomes
   - key: "KEY"
     value: "VALUE"
=cut

sub  trim { my $s = shift; $s =~ s/^\s+|\s+$//g; return $s };

while (<>) {
    chomp;
    m/^#/ and next;  # skip comments
    m/=/ or next;  # skip if no equal sign
    ($key,$val) = split('=', $_, 2);
    print "- key: ",   trim($key), "\n";
    print "  value: ", trim($val), "\n";
}

